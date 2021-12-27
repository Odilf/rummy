import { writable, derived } from 'svelte/store'
import type { Writable, Readable } from "svelte/store"

const default_colors = 3
const default_values = 13

export enum Place {
	Stack = "Stack",
	Hand = "Hand",
	Board = "Board",
	Other = "Other",
}

function buildDefaultTokens(colors = default_colors, values = default_values): Token[] {
	let i = -2
	return range(colors).flatMap(color => range(1, values).flatMap(value => {
		i++
		return range(2).map(() => {
			i++
			return {
				value: value,
				color: color,
				belongs: Place.Stack,
				index: i,
				id: i,
			}
		})
	}))
}	


export interface Token {
	value: number
	color: number
	belongs?: Place
	index?: number
	id?: number
}

function shuffleArray<T>(array: Array<T>) {
	array = [...array]
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

function readStore<T>(store: Readable<T>): T {
	let returnValue: T
	store.subscribe(v => returnValue = v)()
	return returnValue
}

export class Game {
	turn: number = 0
	tokens: Writable<Token[]> = writable(null)
	totalPlayers: number

	stack = derived(this.tokens, tokens => shuffleArray(tokens.filter(token => token.belongs === Place.Stack)))
	players = derived(this.tokens, tokens => range(this.totalPlayers)
											.map(index => tokens
											.filter(token => 
												token.belongs === Place.Hand && 
												token.index === index)))

	board = derived(this.tokens, tokens => {
		const board_tokens = tokens.filter(token => token.belongs === Place.Board)
		const set = new Set(board_tokens.map(token => token.index))

		return [...set].sort().map(index => board_tokens.filter(token => token.index === index))
	})

	draw = (player_index: number): void => {
		const stack = readStore(this.stack)
		if (stack.length <= 0) { console.warn("Not enough cards to draw"); return }

		this.tokens.update(tokens => {
			const token = tokens.find(v => v === stack[0])
			token.belongs = Place.Hand
			token.index = player_index
			return tokens
		})
	}

	moveTo = (selection: Token, place: Place, index: number) => {
		this.tokens.update(tokens => {
			const i = tokens.indexOf(selection)
			tokens[i].belongs = place 
			tokens[i].index = index
			return tokens
		})	
	}

	moveToBoard = (selection: Token, index: number): void => this.moveTo(selection, Place.Board, index)
	moveToHand = (selection: Token, index: number): void => this.moveTo(selection, Place.Hand, index)

	constructor(totalPlayers: number, values = default_values) {
		this.tokens.set(buildDefaultTokens(totalPlayers, values))
		this.totalPlayers = totalPlayers

		range(totalPlayers).forEach(player => {
			range(14).forEach(() => this.draw(player))
		})
	}
}

function range(a: number, b: number = null): number[] {
	const size = b == null ? a : (b - a)
	return [...Array(size).keys()]
}

export function isStair(set: Token[]): boolean {
	if (set.length < 3) return false
	const sameColor = set.every(token => token.color === set[0].color)
	const stair = set.slice(0, -1).every((token, i) => token.value === set[i + 1].value - 1)

	return sameColor && stair
}

export function isGroup(set: Token[]): boolean {
	if (set.length < 3) return false
	const sameValue = set.every(token => token.value === set[0].value)
	const differentColors = new Set(set.map(token => token.color)).size === set.length

	return sameValue && differentColors
}

export function isValidBoard(sets: Token[][]) {
	return sets.every(set => isGroup(set) || isStair(set))
}