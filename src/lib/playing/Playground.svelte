<script lang="ts">
	import Board from "$lib/game/Board.svelte"
	import Hand from "$lib/game/Hand.svelte"

	import type { Token } from "$lib/game/logic/token";
	import { Place } from "$lib/game/logic/token";
	import { getHand, getBoard, stackSize, lowestUnusedIndex, draw } from "$lib/game/logic/game";

	export let players: string[]
	export let tokens: Token[]
	let activePlayer: number = 0

	function handleDrop(e) {
		if ('token' in e.detail) {
			const tokenData = e.detail.token

			let index: number
			let place = Place.Board
			if ('setIndex' in e.detail) {
				index = e.detail.setIndex
			} else if ('playerIndex' in e.detail) {
				index = e.detail.playerIndex
				place = Place.Hand
			} else {
				index = lowestUnusedIndex(tokens)
			}

			const token = tokens.find(token => token.id === tokenData.id)
			token.belongs = place
			token.index = index

			tokens = tokens
		}
	}
</script>


<header class='font-bold rounded flex flex-col sm:flex-row' >
	<div class='flex flex-col h-full sm:py-10'>
		<header class='flex-1 sm:flex-col'>
			<button disabled={activePlayer === 0} on:click={() => activePlayer--}> Previous </button>
			<h2 class='text-6xl text-right'> {players[activePlayer]} </h2>
			<button disabled={activePlayer === players.length - 1} on:click={() => activePlayer++}> Next </button>
		</header>
		<button on:click={() => tokens = draw(tokens, activePlayer)} class='justify-self-end bg-secondary/70 py-2'
			disabled={stackSize(tokens) <= 0}>
			Draw token
		</button>
	</div>
</header>

<Hand hand={getHand(tokens, activePlayer)} index={activePlayer} on:drop={handleDrop}/>

<Board sets={getBoard(tokens)} on:drop={handleDrop}/>