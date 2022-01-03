import type { Token } from './token'

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