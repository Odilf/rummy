import type { Readable } from "svelte/store";

export function range(a: number, b: number = null): number[] {
	const size = b == null ? a : (b - a)
	const adder = b == null ? 0 : a
	return [...Array(size).keys()].map(i => i + adder)
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
	array = [...array]
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export function assignIfNull<T, G>(object: T, value: G): T | G {
	return object == null ? value : object
}

export function readStore<T>(store: Readable<T>): T {
	let value: T
	store.subscribe(v => value = v)()
	return value
}

export function clone(object: any) {
	if (Array.isArray(object)) { return [...object.map(v => clone(v))] }
	return Object.assign({}, object)
}