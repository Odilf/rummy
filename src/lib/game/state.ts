import { browser } from '$app/env'
import { writable } from 'svelte/store'
import type { Token } from './logic'

if (browser) {
	document.onmousemove = (e: MouseEvent) => {
		mousePosition.set({
			x: e.clientX, 
			y: e.clientY,
		})
	}

	document.onscroll = () => {
		scroll.set({
			x: window.scrollX,
			y: window.scrollY,
		})
	}
}

export const mousePosition = writable({ x: 0, y: 0})
export const selection = writable<Token>(null)
export const scroll = writable({x: 0, y: 0})