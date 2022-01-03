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

export function isEqual(a: Token, b: Token): boolean {
	return a.belongs === b.belongs &&
	a.color === b.color &&
	a.id == b.id &&
	a.index == b.index &&
	a.value == b.value
}