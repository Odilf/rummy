<script lang='ts'>
	import { fly } from "svelte/transition";
	import Counter from "$lib/UI/Counter.svelte";

	let showOptions = false
	
	export let totalPlayers: number = 4
	export let players: string[] = []
</script>

<button class='bg-secondary p-2 px-4 mt-4' on:click={() => showOptions = !showOptions}>
	{showOptions ? 'Hide' : 'More'} options
</button>
{#if showOptions}
	<div class='flex flex-wrap justify-evenly bg-white p-10 rounded-t-3xl rounded-b-xl m-3 w-full'
	transition:fly={{y: 300}}>
		<div class='flex flex-col m-4'>
			<h3 class='text-black'>
				Player names
			</h3>
			{#each players.slice(0, totalPlayers) as player, i}
				<input bind:value={player} placeholder='Player {i + 1}' in:fly
				class='text-black text-center my-2 py-2 rounded shadow border-2 border-black/20'>
			{/each}
			<button class='text-black text-2xl' on:click={() => totalPlayers++}> + </button>
		</div>

		<div class='flex flex-col m-4'>
			<h3 class='text-black'>
				Tokens
			</h3>
			<Counter> Tokens per player </Counter>
			<Counter> Token range </Counter>
			<Counter> Color range </Counter>
		</div>
	</div>
{/if}

<style lang=postcss>
	h3 {
		@apply font-bold text-xl
	}
</style>

