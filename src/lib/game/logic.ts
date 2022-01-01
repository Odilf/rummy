import { range, assignIfNull } from '$lib/utils'

const default_colors = 3
const default_values = 13

export enum Place {
	Stack = "Stack",
	Hand = "Hand",
	Board = "Board",
	Other = "Other",
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
	index?: number

	static getPossessiveName(name: string): string {
		const endsInS = name.charAt(name.length - 1).toLowerCase() === 's'
		return name + (endsInS ? "'" : "'s")
	}

	static defaultNames(amount: number): string[] {
		return range(amount).map(i => `Player ${i + 1}`)
	}
}

export class Game {
	static board(tokens: Token[]): Token[][] {
		const board_tokens = tokens.filter(token => token.belongs === Place.Board)
		const set = new Set(board_tokens.map(token => token.index))

		return [...set].sort().map(index => board_tokens.filter(token => token.index === index))
	}

	static hand(tokens: Token[], index: number): Token[] {
		return tokens.filter(token => token.belongs === Place.Hand && token.index === index)
	}

	static stack(tokens: Token[]) {
		return tokens.filter(token => token.belongs === Place.Stack)
	}

	static stackSize(tokens: Token[]): number {
		return tokens.filter(token => token.belongs === Place.Stack).length
	}

	static draw(tokens: Token[], playerIndex: number): Token[] {
		if (Game.stackSize(tokens) <= 0) { console.warn("Not enough cards to draw"); return }

		const stack = Game.stack(tokens)
		const find = stack[Math.floor(Math.random() * stack.length)]
		const token = tokens.find(token => token === find)
		token.belongs = Place.Hand
		token.index = playerIndex
		return tokens
	}

	static buildDefaultTokens(colorRange = 4, valueRange = 12, repeat = 2): Token[] {
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

	static newGame(players: Player[], tokenOptions: TokenOptions = {}): Token[] {
		
		tokenOptions = Game.parseTokenOptions(tokenOptions, players.length)

		// Create tokens
		let tokens = this.buildDefaultTokens(tokenOptions.colorRange, tokenOptions.valueRange, tokenOptions.repeat)

		// Draw cards
		players.forEach(player => {
			range(tokenOptions.drawAmount).forEach(() => tokens = this.draw(tokens, player.index))
		})

		return tokens
	}

	static parseTokenOptions(options: TokenOptions, players: number): TokenOptions {
		options.colorRange = assignIfNull(options.colorRange, players)
		options.valueRange = assignIfNull(options.valueRange, 12)
		options.drawAmount = assignIfNull(options.drawAmount, 14)
		options.repeat = assignIfNull(options.repeat, 2)

		return options
	}
}

interface TokenOptions {
	colorRange?: number,
	valueRange?: number,
	drawAmount?: number, 
	repeat?: number,
}

export class TokenSet {
	static isStair(set: Token[]): boolean {
		if (set.length < 3) return false
		const sameColor = set.every(token => token.color === set[0].color)
		const stair = set.slice(0, -1).every((token, i) => token.value === set[i + 1].value - 1)
	
		return sameColor && stair
	}
	
	static isGroup(set: Token[]): boolean {
		if (set.length < 3) return false
		const sameValue = set.every(token => token.value === set[0].value)
		const differentColors = new Set(set.map(token => token.color)).size === set.length
	
		return sameValue && differentColors
	}
	
	static isValidBoard(sets: Token[][]) {
		return sets.every(set => TokenSet.isGroup(set) || TokenSet.isStair(set))
	}
}
