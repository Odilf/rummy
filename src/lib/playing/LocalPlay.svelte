<script lang="ts">
	import Board from "$lib/game/Board.svelte"
	import Hand from "$lib/game/Hand.svelte"

	import { isEqual, Token, Place } from "$lib/game/logic/token";
	import { isValidBoard } from "$lib/game/logic/set";
	import { getPossessiveName } from "$lib/game/logic/player";
	import { getHand, getBoard, lowestUnusedIndex, draw, clone } from "$lib/game/logic/game";
	
	import Overlay from "$lib/UI/Overlay.svelte"
	import { fly } from "svelte/transition";


	export let players: string[]
	export let tokens: Token[]
	let turn: number = 0
	
	$: modTurn = turn % players.length
	$: currentHand = getHand(tokens, modTurn)
	
	let lastValidState: Token[] = []
	let disableOverlay = false

	let hasPlayed = false

	$: hasPlayed = currentHand.length !== getHand(lastValidState, modTurn).length

	function handleDrop(e) {
		if ('token' in e.detail) {
			const tokenData = e.detail.token

			let index: number
			let place = Place.Board
			if ('setIndex' in e.detail) {
				index = e.detail.setIndex
			} else if ('playerIndex' in e.detail) {
				if (!getHand(lastValidState, modTurn).map(token => token.id).includes(tokenData.id)) {
					console.log('Not my token!');
					return
				}

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

	function pass(toTurn: number) {
		turn = toTurn
		modTurn = turn % players.length
		console.log({ turn, modTurn});
		
		if (!hasPlayed) {
			tokens = draw(tokens, modTurn)
		}
		
		lastValidState = clone(tokens)
		disableOverlay = false
	}

	pass(0)
</script>

<Overlay bind:disabled={disableOverlay} fragile={false} let:close>
	<h1 class='text-5xl p-5'>
		{getPossessiveName(players[modTurn])} turn
	</h1>
	<button class='bg-black p-5 text-3xl' on:click={() => close()}> Start </button>
</Overlay>

<main class='font-bold rounded m-4 mb-0 flex flex-col' >
	<div class='flex flex-col items-center h-full sm:py-5'>
		<h2 class='text-6xl text-center m-4'> {getPossessiveName(players[modTurn])} turn </h2>
		<button on:click={() => pass(turn + 1)} class='bg-secondary/70 p-2 w-fit' disabled={!isValidBoard(getBoard(tokens))}>
			{hasPlayed ? 'Pass' : 'Draw and pass'}
		</button>

		{#if hasPlayed}
			<button on:click={() => tokens = clone(lastValidState)}>
				Reset
			</button>
		{/if}
	</div>

</main>

{#key modTurn}
<span in:fly={{ duration: 200, x: 200, delay: 200 }} class='w-full flex justify-center'>
	<Hand hand={currentHand} index={modTurn} on:drop={handleDrop}/>
</span>
{/key}

<Board sets={getBoard(tokens)} on:drop={handleDrop}/>