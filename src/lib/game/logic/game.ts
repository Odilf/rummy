import { range, assignIfNull } from "$lib/utils/"
import type { Token } from "./token"
import { Place } from "./token"

export function getBoard(tokens: Token[]): Token[][] {
	const board_tokens = tokens.filter(token => token.belongs === Place.Board)
	const set = new Set(board_tokens.map(token => token.index))

	return [...set].sort().map(index => board_tokens.filter(token => token.index === index))
}

export function getHand(tokens: Token[], index: number): Token[] {
	return tokens.filter(token => token.belongs === Place.Hand && token.index === index)
}

export function getStack(tokens: Token[]) {
	return tokens.filter(token => token.belongs === Place.Stack)
}

export function stackSize(tokens: Token[]): number {
	return tokens.filter(token => token.belongs === Place.Stack).length
}

export function draw(tokens: Token[], playerIndex: number): Token[] {
	if (stackSize(tokens) <= 0) { console.warn("Not enough cards to draw"); return }

	const stack = getStack(tokens)
	const find = stack[Math.floor(Math.random() * stack.length)]
	const token = tokens.find(token => token === find)
	token.belongs = Place.Hand
	token.index = playerIndex
	return tokens
}

function buildDefaultTokens(colorRange = 4, valueRange = 12, repeat = 2): Token[] {
	let tokens: Token[] = []
	for (let c = 0; c < colorRange; c++) {
		for (let v = 1; v <= valueRange; v++) {
			for (let r = 0; r < repeat; r++) {
				const i = c * valueRange + v + r * (valueRange * colorRange)
				tokens.push({
					color: c,
					value: v,
					belongs: Place.Stack,
					index: i,
					id: i,
				})
			}
		}
	}

	return tokens
}

export function newGame(players: string[], options: GameOptions = {}): Token[] {
	
	options = Object.assign(options, defaultGameOptions) 
	

	// Create tokens
	let tokens = buildDefaultTokens(options.colors, options.values, options.tokenRepeats)

	// Draw cards
	players.forEach((_, i) => {
		range(options.drawAmount).forEach(() => tokens = draw(tokens, i))
	})

	return tokens
}

export function lowestUnusedIndex(tokens: Token[]) {
	return getBoard(tokens).map(set => set[0].index).reduce((acc, cur) => cur > acc ? cur : acc, -1) + 1
}

interface GameOptions {
	colors?: number
	values?: number
	drawAmount?: number
	tokenRepeats?: number
	minimumInitial?: number
	wildCardAmount?: number
}

const defaultGameOptions: GameOptions = {
	colors: 4,
	values: 12,
	drawAmount: 14,
	tokenRepeats: 2,
	minimumInitial: 30,
	wildCardAmount: 2
}