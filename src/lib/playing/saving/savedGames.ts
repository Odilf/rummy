import { browser } from "$app/env";
import { Game, Player } from "$lib/game/logic";
import type { Token } from "$lib/game/logic";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export let savedGames: Writable<SavedGame[]> = writable([])

function replacer(key: string, value: any): any {
	console.log('Saving', this[key]);
	
	if (this[key] instanceof Date) {
		return this[key].getTime()
	} else 
	if (typeof this[key] === 'object' && !(this[key] instanceof Game) && 'subscribe' in this[key]) {
		console.log('Stringifying store', this[key]);
		let storeValue

		this[key].subscribe(v => storeValue = v)()

		console.log('Saving value', storeValue);	
		
		return storeValue
	} else {
		return value
	}
}

function reviver(key: string, value: any): any {
	if (typeof this[key] === 'number' && this[key] > 1000) {
		return new Date(this[key]) 
	} else {
		return value
	}
}

if (browser) {
	const stored = JSON.parse(window.localStorage.getItem('games'), reviver)

	if (stored == null) {
		savedGames = writable([])
	} else {
		savedGames = writable(stored)
	}

	savedGames.subscribe(v => {
		window.localStorage.setItem('games', JSON.stringify(v, replacer))
		console.log('Saving game', v);		
	})
}

interface PlaygroundGame {
	tokens: Token[]
	players: Player[]
	date: Date
	name?: string
}

interface LocalGame {
	tokens: Token[]
	players: Player[]
	turn: number
	date: Date
	name?: string
}

export type SavedGame = PlaygroundGame | LocalGame