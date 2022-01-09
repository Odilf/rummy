import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, onDisconnect, onValue, ref, remove, set, get } from 'firebase/database'
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { writable } from 'svelte/store';
import type { Token } from '$lib/game/logic/token';
import { draw, newGame } from '$lib/game/logic/game';
import type { GameOptions } from "$lib/game/logic/game";
import { browser, dev } from "$app/env";

const firebaseConfig = {
	apiKey: "AIzaSyBIKvmS56XTqJpIJxrKW7bWMB6yeAdCPOE",
	authDomain: "rummy-a9ed4.firebaseapp.com",
	projectId: "rummy-a9ed4",
	databaseURL: 'https://rummy-a9ed4-default-rtdb.europe-west1.firebasedatabase.app/',
	storageBucket: "rummy-a9ed4.appspot.com",
	messagingSenderId: "1020724513588",
	appId: "1:1020724513588:web:e0929871a31ffa6a077361",
	measurementId: "G-4LXLEP61EM",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

interface OnlineGame {
	options: {
		drawDelay?: number
	}

	players: string[]
	started: boolean
	winner?: string
	
	tokens?: Token[]
	waitingToDraw?: number[]
}

export function getGame(uid: string) {
	let game = writable(null as OnlineGame)
	onValue(ref(db, `games/${uid}`), snapshot => {
		const value = snapshot.val()
		game.set(value)
	})
	return game
}

export async function createGame(uid: string, creatorUsername: string) {
	const gameRef = ref(db, `games/${uid}`)
	onDisconnect(gameRef).remove()

	await set(gameRef, {
		players: [ creatorUsername ],
		started: false,
	} as OnlineGame)
}

export async function joinGame(uid: string, joinAs: string, index: number) {
	const playerRef = ref(db, `games/${uid}/players/${index}`)

	onDisconnect(playerRef).remove()
	await set(playerRef, joinAs)
}

export async function startGame(uid: string, players: string[], options: GameOptions, onlineOptions: { drawDelay: number }) {
	set(ref(db, `games/${uid}/options`), onlineOptions)
	set(ref(db, `games/${uid}/tokens`), newGame(players, options))
	set(ref(db, `games/${uid}/started`), true)
}

export async function updateTokens(uid: string, tokens: Token[]) {
	await set(ref(db, `games/${uid}/tokens`), tokens)
}

export async function requestDraw(uid: string, playerIndex: number) {
	const game = (await get(ref(db, `games/${uid}`))).val() as OnlineGame

	if (game.waitingToDraw && game.players.every((_, i) => i === playerIndex || game.waitingToDraw[i])) {
		game.players.forEach((_, i) => game.tokens = draw(game.tokens, i))
		set(ref(db, `games/${uid}/tokens`), game.tokens)
		remove(ref(db, `games/${uid}/waitingToDraw`))
	} else {		
		set(ref(db, `games/${uid}/waitingToDraw/${playerIndex}`), true)
	}
}

export function win(uid: string, player: string) {
	set(ref(db, `games/${uid}/winner`), player)
}