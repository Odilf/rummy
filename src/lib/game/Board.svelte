<script lang="ts">
	import Set from './Set.svelte'
	import type { Token } from './logic'
	import { dropzone } from '$lib/draggable/draggable'
	import { flip } from 'svelte/animate';

	export let sets: Token[][]
</script>

<div class='bg-[#008600] h-fit w-4/5 rounded-lg flex flex-wrap px-10 py-2 sm:py-5 justify-center' 
use:dropzone on:drop>
	{#each sets as set (set[0].index)}
		<div animate:flip> 
			<Set tokens={set} index={set[0].index} on:drop/>
		</div>
	{/each}
</div>