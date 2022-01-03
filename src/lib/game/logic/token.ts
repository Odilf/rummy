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