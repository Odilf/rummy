<script lang="ts">
	import Token from "./Token.svelte";
	import Set from './Set.svelte'
	import { selection } from './state'
	import type { Place, Token as TokenType } from './logic'
	import { dropzone } from '$lib/draggable/draggable'

	export let sets: TokenType[][]
	
	function handleSetDrop(e: MouseEvent, index: number): void {
		if (!$selection || ($selection.belongs === "Board" && $selection.index === index)) return
	}

</script>

<div 
class='bg-[#7c3d0d] min-h-[30%] w-full flex flex-wrap px-10 py-5 justify-center' 
use:dropzone on:drop>
	{#each sets as set (set[0].index)}
		<Set tokens={set} index={set[0].index} on:drop/>
	{/each}
</div>

<!-- <style>
	.board {
		display: flex;
		flex-wrap: wrap;

		min-height: 200px;
		background-color: hsla(36, 80%, 62%, 0.637);
		box-shadow: var(--shadow);

		backdrop-filter: blur(20px);

		border-radius: 20px;
		transition: all 0.5s ease;
	}

	.invalid {
		background-color: hsl(0, 51%, 32%);
	}

	.invalid-set {
		box-shadow: 0 0 20px black;
	}

	.group {
		--color: hsla(192, 100%, 60%, 0.25);
	}

	.stair {
		--color: hsla(288, 100%, 60%, 0.25);
	}

	.set {
		display: flex;
		flex-wrap: wrap;

		width: fit-content;
		height: fit-content;
		/* padding: 10px; */

		/* background-color: blanchedalmond; */
		margin: 10px;
		border-radius: 20px;

		background-color: var(--color);
		box-shadow: 0 0 20px var(--color);
	}
</style> -->