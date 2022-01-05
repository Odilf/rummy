import { range } from '$lib/utils'

export function getPossessiveName(name: string): string {
	name = name.split(' ')[0]
	const endsInS = name.charAt(name.length - 1).toLowerCase() === 's'
	return name + (endsInS ? "'" : "'s")
}

export function defaultNames(amount: number): string[] {
	return range(amount).map(i => `Player ${i + 1}`)
}