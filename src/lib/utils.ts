export function range(a: number, b: number = null): number[] {
	const size = b == null ? a : (b - a)
	const adder = b == null ? 0 : a
	return [...Array(size).keys()].map(i => i + adder)
}