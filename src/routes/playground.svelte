<script lang="ts">
	import { fly } from 'svelte/transition'
	import type { Readable, Writable } from "svelte/store";
	import { Game, Place, Player, Token } from "$lib/game/logic"
	import Playground from '$lib/playing/Playground.svelte';
import { bind } from 'svelte/internal';

	// let numberOfPlayers = 4
	let game: Game

	const flyDistance = 500
	const duration = 800

	let totalPlayers = 4

	let caca = 'Pythagoras'
</script>

{#key game}

<body class='bg-primary' in:fly={{y: flyDistance, duration}} out:fly={{y: -flyDistance, duration}}>
	{#if !game}
		<main class='h-full flex flex-col justify-center'>
			<h1 class='mb-10 text-6xl sm:text-8xl'> Playground </h1>
			<slot/>
			<button class='text-5xl p-8 mt-8 bg-white text-secondary' on:click={() => game = new Game(Player.defaultNames(totalPlayers))}> New game </button>
			<label for='players' class='mt-10 mb-2 text-xl opacity-50'> Number of players: </label>
			<input name='players' type="number" bind:value={totalPlayers} class='text-black text-3xl font-bold text-center w-20 opacity-80'>
		</main>
	{:else}
		<Playground playerNames={['John', caca]}/>
	{/if}
</body>

{/key}