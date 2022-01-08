<script lang="ts">
	import Set from './Set.svelte'
	import type { Token } from './logic/token'
	import { dropzone } from '$lib/draggable/draggable'
	import { flip } from 'svelte/animate';

	export let sets: Token[][]
</script>

<div class='bg-tertiary min-h-[300px] h-fit w-full sm:w-4/5 rounded-lg flex flex-wrap px-0 py-2 sm:py-5 justify-center shadow' 
use:dropzone on:drop>
	{#each sets as set (set[0].index)}
		<div> 
			<Set tokens={set} index={set[0].index} on:drop/>
		</div>
	{/each}
</div>