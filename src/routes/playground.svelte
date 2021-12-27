<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Readable, Writable } from "svelte/store";
	import { Game, Place, Token } from "$lib/game/logic"
	import Board from '$lib/game/Board.svelte'
	import Hand from "$lib/game/Hand.svelte";
import GameInitializer from '$lib/playing/GameInitializer.svelte';

	// let numberOfPlayers = 4
	let game: Game; let players: Readable<Token[][]>; let board: Readable<Token[][]>; let tokens: Writable<Token[]>

	const flyDistance = 500
	const duration = 800

	let activePlayer = 0
	let totalPlayers: number

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
	<h1 class='mb-10 text-6xl sm:text-8xl'> Playground </h1>
	{#if !game}
	<GameInitializer bind:game bind:totalPlayers/>
	
	{:else}
	<!-- <h1 class='mb-2 text-6xl sm:text-8xl'> Playground </h1> -->

		<main class='font-bold rounded m-4 mb-0 flex flex-col sm:flex-row' >
			<div class='flex flex-col h-full sm:py-10'>
				<header class='flex-1 sm:flex-col'>
					<button disabled={activePlayer === 0} on:click={() => activePlayer--}> Previous </button>
					<h2 class='text-6xl '> Player {activePlayer} </h2>
					<button disabled={activePlayer === totalPlayers - 1} on:click={() => activePlayer++}> Next </button>
				</header>
				<button on:click={() => game.draw(activePlayer)} class='justify-self-end bg-secondary/70 py-2'
					disabled={$tokens.filter(token => token.belongs === Place.Stack).length <= 0}>
					Draw token
				</button>
			</div>

			<Hand hand={$players[activePlayer]} index={activePlayer} on:drop={handleDrop}/>
		</main>

		<Board sets={$board} on:drop={handleDrop}/>
		
		<div class="min-h-[1000px] w-10"></div>

		<button on:click={() => game = null}> Finish game </button>
	{/if}
</body>

{/key}