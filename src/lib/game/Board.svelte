<script lang="ts">
	import Set from './Set.svelte'
	import type { Token } from './logic'
	import { dropzone } from '$lib/draggable/draggable'

	export let sets: Token[][]
</script>

<div class='bg-[#7c3d0d] min-h-[30%] w-full flex flex-wrap px-10 py-5 justify-center' 
use:dropzone on:drop>
	{#each sets as set (set[0].index)}
		<Set tokens={set} index={set[0].index} on:drop/>
	{/each}
</div>