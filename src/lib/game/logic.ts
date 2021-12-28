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

export class Player {
	name: string
	index: number

	getPossessiveName(): string {
		const endsInS = this.name.charAt(this.name.length - 1).toLowerCase() === 's'
		return this.name + (endsInS ? "'" : "'s")
	}

	constructor(name: string, index: number) {
		this.name = name
		this.index = index
	}

	static defaultNames(amount: number): string[] {
		return range(amount).map(i => `Player ${i + 1}`)
	}
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
	players: Player[]

	subscribe(callback) {
		return this.tokens.subscribe(callback)
	}

	static getBoard(tokens: Token[]): Token[][] {
		const board_tokens = tokens.filter(token => token.belongs === Place.Board)
		const set = new Set(board_tokens.map(token => token.index))

		return [...set].sort().map(index => board_tokens.filter(token => token.index === index))
	}

	static getHand(tokens: Token[], index: number): Token[] {
		return tokens.filter(token => token.belongs === Place.Hand && token.index === index)
	}

	static getStack(tokens: Token[]) {
		return tokens.filter(token => token.belongs === Place.Stack)
	}

	static stackSize(tokens: Token[]): number {
		return tokens.filter(token => token.belongs === Place.Stack).length
	}

	draw = (playerIndex: number): void => {
		if (Game.stackSize(readStore(this.tokens)) <= 0) { console.warn("Not enough cards to draw"); return }

		this.tokens.update(tokens => {			
			const stack = Game.getStack(tokens)
			const find = stack[Math.floor(Math.random() * stack.length)]
			const token = tokens.find(token => token === find)
			token.belongs = Place.Hand
			token.index = playerIndex
			return tokens
		})
	}

	passTurn = () => {
		this.turn = (this.turn + 1) % this.players.length
	}

	constructor(playerNames: string[], values = default_values, drawAmount = 14) {
		this.tokens.set(buildDefaultTokens(playerNames.length, values))

		this.players = playerNames.map((name, i) => {
			range(drawAmount).forEach(() => this.draw(i))
			return new Player(name, i)
		})
	}
}

function range(a: number, b: number = null): number[] {
	const size = b == null ? a : (b - a)
	const adder = b == null ? 0 : a
	return [...Array(size).keys()].map(i => i + adder)
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