import { range } from '$lib/utils'

export interface Player {
	name: string
	index?: number

}
export function getPossessiveName(name: string): string {
	const endsInS = name.charAt(name.length - 1).toLowerCase() === 's'
	return name + (endsInS ? "'" : "'s")
}

export function defaultNames(amount: number): string[] {
	return range(amount).map(i => `Player ${i + 1}`)
}