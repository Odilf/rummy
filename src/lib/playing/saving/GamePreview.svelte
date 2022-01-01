<script lang="ts">
	import type { SavedGame } from "./savedGames";
	// import Token from "$lib/game/Token.svelte";
	import { Game } from "$lib/game/logic";
	import Set from '$lib/game/Set.svelte'

	export let savedGame: SavedGame
</script>

<div class='rounded-xl overflow-hidden bg-secondary m-4'>
	<div class='p-4'>
		{#each Game.board(savedGame.tokens) as set, i}
			<Set tokens={set} index={i}/>
		{/each}
		
	</div>

	<div class='bg-white text-black p-4'>
		<h1> {savedGame.name} </h1>
		<h2 class='opacity-60'> {savedGame.date.toDateString()} </h2>
	</div>
</div>