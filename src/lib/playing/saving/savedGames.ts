import { browser } from "$app/env";
import type { Token } from "$lib/game/logic/token";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export let savedGames: Writable<SavedGame[]> = writable([])

function replacer(key: string, value: any): any {
	console.log('Saving', this[key]);
	
	if (this[key] instanceof Date) {
		return { type: 'Date', time: this[key].getTime()}
	} else {
		return value
	}
}


function reviver(key: string, value: any): any {
	if (this[key] != null && typeof this[key] === 'object' && 'type' in this[key] && this[key].type === 'Date') {
		return new Date(this[key].time) 
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
	players: string[]
	date: Date
	name?: string
}

interface LocalGame {
	tokens: Token[]
	players: string[]
	turn: number
	date: Date
	name?: string
}

export type SavedGame = PlaygroundGame | LocalGame

export function deleteGame(game: SavedGame) {
	savedGames.update(games => games.filter(v => v !== game))
}