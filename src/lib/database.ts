import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, onDisconnect, onValue, ref, remove, set, get, DataSnapshot } from 'firebase/database'
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Token } from '$lib/game/logic/token';
import { buildDefaultTokens, draw, newGame } from '$lib/game/logic/game';

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
// export const analytics = getAnalytics(app);

export const db = getDatabase(app);

// Store synced to database
// export const games = writable([] as WaitingGame[])
// onValue(ref(db, 'games'), snapshot => {
// 	const newGames = []
// 	snapshot.forEach(child => {
// 		newGames.push({
// 			uid: child.key,
// 			...child.val()
// 		})
// 	})

// 	games.set(newGames)
// })

interface OnlineGame {
	uid: string
	settings: string
	players: string[]
	started: boolean

	tokens?: Token[]
	waitingToDraw?: number[]
}

export function getGame(uid: string) {
	let game = writable(null as OnlineGame)
	onValue(ref(db, `games/${uid}`), snapshot => game.set(snapshot.val()))
	return game
}

export async function createGame(uid: string, creatorUsername: string) {
	const gameRef = ref(db, `games/${uid}`)
	onDisconnect(gameRef).remove()

	await set(gameRef, {
		settings: 'default',
		players: [],
		started: false,
	})

	return await joinGame(uid, creatorUsername, 0)
}

export async function joinGame(uid: string, joinAs: string, index: number) {
	const playerRef = ref(db, `games/${uid}/players/${index}`)
	// const game = writable(null as OnlineGame)

	// onValue(ref(db, `started/${uid}`), snapshot => {
	// 	snapshot.val() && game.set(snapshot.val())
	// })

	onDisconnect(playerRef).remove()
	await set(playerRef, joinAs)

	// return game
}

export async function startGame(uid: string, players: string[]) {
	const gamePath = `games/${uid}`
	set(ref(db, `games/${uid}/started`), true)
	set(ref(db, `games/${uid}/tokens`), newGame(players))
}

export async function updateTokens(uid: string, tokens: Token[]) {
	await set(ref(db, `games/${uid}/tokens`), tokens)
}

export async function requestDraw(uid: string, playerIndex: number) {
	const game = (await get(ref(db, `games/${uid}`))).val() as OnlineGame
	console.log('Requesting draw. Player', playerIndex);

	if (game.waitingToDraw && game.players.every((_, i) => i === playerIndex || game.waitingToDraw[i])) {
		console.log('Everyone is waiting to draw, proceed to drawing');
		
		game.players.forEach((_, i) => game.tokens = draw(game.tokens, i))
		set(ref(db, `games/${uid}/tokens`), game.tokens)
		remove(ref(db, `games/${uid}/waitingToDraw`))
	} else {		
		console.log('Player', playerIndex, 'added to queue');
		set(ref(db, `games/${uid}/waitingToDraw/${playerIndex}`), true)
	}
}