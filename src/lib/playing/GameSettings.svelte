<script lang='ts'>
	import { fly } from "svelte/transition";
	import Counter from "$lib/UI/Counter.svelte";
	import { defaultGameOptions } from "$lib/game/logic/game";

	let showOptions = false
	
	export let options = defaultGameOptions
	export let onlineOptions: { drawDelay: number } = null
</script>

<button class='bg-secondary p-2 px-4 mt-4' on:click={() => showOptions = !showOptions}>
	{showOptions ? 'Hide configuration' : 'Configure game'}
</button>
{#if showOptions}
	<div class='flex flex-wrap justify-evenly bg-white p-10 rounded-t-3xl rounded-b-xl m-3 w-full max-w-[820px]'
	transition:fly={{y: 300}}>
		<Counter bind:value={options.colors}> Number of colors </Counter>
		<Counter bind:value={options.drawAmount}> Draw amount </Counter>
		<Counter bind:value={options.tokenRepeats}> Token repeats </Counter>
		<Counter bind:value={options.values}> Number of values </Counter>
		<Counter bind:value={options.wildcardAmount}> Wildcard amount </Counter>
		
		{#if onlineOptions}
			<Counter bind:value={onlineOptions.drawDelay}> Draw delay </Counter>
			<!-- <Counter bind:value={options.minimumInitial}> Minimum initial play </Counter> -->
		{:else}	
			idk
		{/if}
		<slot/>
	</div>
{/if}