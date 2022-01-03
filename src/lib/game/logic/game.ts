import { range, assignIfNull } from "$lib/utils"
import type { Token } from "./token"
import { Place } from "./token"
import type { Player } from "./player"

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

export function buildDefaultTokens(colorRange = 4, valueRange = 12, repeat = 2): Token[] {
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

export function newGame(players: Player[], tokenOptions: TokenOptions = {}): Token[] {
	
	tokenOptions = parseTokenOptions(tokenOptions, players.length)

	// Create tokens
	let tokens = buildDefaultTokens(tokenOptions.colorRange, tokenOptions.valueRange, tokenOptions.repeat)

	// Draw cards
	players.forEach(player => {
		range(tokenOptions.drawAmount).forEach(() => tokens = draw(tokens, player.index))
	})

	return tokens
}

export function parseTokenOptions(options: TokenOptions, players: number): TokenOptions {
	options.colorRange = assignIfNull(options.colorRange, players)
	options.valueRange = assignIfNull(options.valueRange, 12)
	options.drawAmount = assignIfNull(options.drawAmount, 14)
	options.repeat = assignIfNull(options.repeat, 2)

	return options
}

export function lowestUnusedIndex(tokens: Token[]) {
	return getBoard(tokens).map(set => set[0].index).reduce((acc, cur) => cur > acc ? cur : acc, -1) + 1
}

interface TokenOptions {
	colorRange?: number,
	valueRange?: number,
	drawAmount?: number, 
	repeat?: number,
}