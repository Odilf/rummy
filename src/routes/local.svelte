<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Readable, Writable } from "svelte/store";
	import { Game, Place, Token } from "$lib/game/logic"
	import Board from '$lib/game/Board.svelte'
	import Hand from "$lib/game/Hand.svelte";
import Overlay from '$lib/Overlay.svelte';

	let game: Game
	let players: Readable<Token[][]>
	let board: Readable<Token[][]>
	let tokens: Writable<Token[]>

	const flyDistance = 500
	const duration = 800

	let turn = 0
	let totalPlayers = 4
	let playerNames = []

	let confirmingTurn = false

	$: while (playerNames.length < totalPlayers) {
		playerNames = [...playerNames, '']
	}
	$: while (playerNames.length > totalPlayers) {
		playerNames = playerNames.slice(0, -1)
	}

	$: if (game) {
		players = game.players
		board = game.board
		tokens = game.tokens
		playerNames = playerNames.map((name, i) => name === '' ? `Player ${i + 1}` : name)
	}

	function startGame() {
		game = new Game(totalPlayers)
		// confirmingTurn = true
	}

	function drawAndPass() {
		game.draw(turn)
		turn = (turn + 1) % totalPlayers
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
		<main class='h-full flex flex-col justify-center'>
			<h1 class='mb-10 text-6xl sm:text-8xl'> Configure game </h1>
			<slot/>
			<button class='text-5xl p-8 mt-8 bg-white text-secondary' on:click={startGame}> New game </button>
			<label for='players' class='mt-10 mb-2 text-xl opacity-50'> Number of players: </label>
			<input name='players' type="number" bind:value={totalPlayers} class='text-black text-3xl font-bold text-center w-20 opacity-80 mb-2'>
			<div class="flex flex-col">
				{#each playerNames as name, i}
					<input class='my-1 text-black text-center rounded py-2' 
					bind:value={name} placeholder="Player {i}" type='text'>
				{/each}
			</div>
		</main>
	{:else}
		<main class='font-bold rounded m-4 flex flex-col' >
			<header class='flex-1'>
				<h2 class='text-6xl'> {playerNames[turn]}{playerNames[turn].charAt(-1) === 's' ? "'" : "'s"} Turn </h2>
			</header>

			<button on:click={drawAndPass} 
				disabled={$tokens.filter(token => token.belongs === Place.Stack).length <= 0}> 
				Draw and pass 
			</button>

			<Hand hand={$players[turn]} index={turn} on:drop={handleDrop}/>
		</main>

		<Board sets={$board} on:drop={handleDrop}/>
		
		<div class="min-h-[1000px] w-10"></div>

		<button on:click={() => game = null}> Finish game </button>
	{/if}
</body>

{/key}

<Overlay disabled={!confirmingTurn}>
	<button class='font-thin text-3xl' on:click={() => confirmingTurn = false}> Start turn </button>
</Overlay>