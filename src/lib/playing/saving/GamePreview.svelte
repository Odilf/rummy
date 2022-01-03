<script lang='ts' context='module'>
	let current

	export function caca() {
		console.warn('caca');
		
	}
</script>

<script lang="ts">
	import { SavedGame, deleteGame } from "./savedGames";
	// import Token from "$lib/game/Token.svelte";
	import { getBoard } from "$lib/game/logic/game";
	import Set from '$lib/game/Set.svelte'
	import { fly } from "svelte/transition";

	export let savedGame: SavedGame

	let confirmingDeletion = false
	const transitionClass = 'transition-all duration-300'

	function confirmDeletion() {
		confirmingDeletion = true
		current = this

		if (current && current != this) {
			current.caca()
		}
		current = this
	}
	// export function caca() {
	// 	console.log('caca');
		
	// }
	
</script>

<button class='relative m-4' transition:fly={{x: 200}}>
	<div class='rounded-xl overflow-hidden bg-secondary'>
		<div class='p-4 opacity-80'>
			{#each getBoard(savedGame.tokens) as set, i}
				<Set tokens={set} index={i}/>
			{:else}
				<span> I'm very sad rn </span>
			{/each}
	
		</div>
	
		<div class='bg-white text-black p-4'>
			<h1> {savedGame.name} </h1>
			<h2 class='opacity-60'> {savedGame.date.toDateString()} </h2>
		</div>
	
	</div>

	<div class='absolute z-10 top-0 left-0 -translate-x-1/3 -translate-y-1/3 bg-warn rounded-full flex items-center shadow
	w-10 h-10 overflow-hidden {confirmingDeletion ? 'w-[13rem] h-20 shadow-2xl' : ''} {transitionClass}'>
		<button on:click={confirmDeletion} 
			class='p-2 {transitionClass}'
			disabled={confirmingDeletion}> 
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6" >
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
			</svg>
		</button>

		<div class='flex flex-col items-center'>
			<h1 class='text-xl'> Sure? </h1>
			<div class='flex'>
				<button class='p-2' on:click={() => confirmingDeletion = false}> Cancel </button>
				<button class='p-2 font-bold' on:click={() => deleteGame(savedGame)}> Confirm </button>
			</div>
		</div>
	</div>
</button>

<style lang='postcss'>
	button:disabled {
		@apply text-white;
		@apply text-opacity-30;
	}	
</style>