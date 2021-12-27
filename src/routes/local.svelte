<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Readable, Writable } from "svelte/store";
	import { Game, Place, Token } from "$lib/game/logic"
	import Board from '$lib/game/Board.svelte'
	import Hand from "$lib/game/Hand.svelte";
	import GameInitializer from '$lib/playing/GameInitializer.svelte';

	let game: Game
	let players: Readable<Token[][]>
	let board: Readable<Token[][]>
	let tokens: Writable<Token[]>

	const flyDistance = 500
	const duration = 800

	let activePlayer = 0

	$: if (game) {
		players = game.players
		board = game.board
		tokens = game.tokens
	}

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
				index = lowestUnusedIndex()
			}

			tokens.update(tokens => {
				const token = tokens.find(token => token.id === tokenData.id)
				token.belongs = place
				token.index = index
				return tokens
			})
		}
	}

	function lowestUnusedIndex(): number {
		return $board.map(set => set[0].index).reduce((acc, cur) => cur > acc ? cur : acc, -1) + 1
	}
</script>

{#key game}

<body class='bg-primary' in:fly={{y: flyDistance, duration}} out:fly={{y: -flyDistance, duration}}>
	{#if !game}
		<GameInitializer bind:game/>
	{:else}
		<main class='font-bold rounded m-4 flex flex-col' >
			<header class='flex-1'>
				<!-- <button disabled={activePlayer === 0} on:click={() => activePlayer--}> Previous </button> -->
				<h2 class='text-6xl '> Player {activePlayer} </h2>
				<!-- <button disabled={activePlayer === numberOfPlayers - 1} on:click={() => activePlayer++}> Next </button> -->
			</header>

			<button on:click={() => game.draw(activePlayer)} 
				disabled={$tokens.filter(token => token.belongs === Place.Stack).length <= 0}> 
				Draw and pass 
			</button>

			<Hand hand={$players[activePlayer]} index={activePlayer} on:drop={handleDrop}/>
		</main>

		<Board sets={$board} on:drop={handleDrop}/>
		
		<div class="min-h-[1000px] w-10"></div>

		<button on:click={() => game = null}> Finish game </button>
	{/if}
</body>

{/key}