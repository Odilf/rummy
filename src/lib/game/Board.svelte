<script lang="ts">
	import Token from "./Token.svelte";
	import { selection } from './state'
	import { isValidBoard, Place, Token as TokenType } from './logic'
	import { isStair, isGroup } from './logic'
	import { flip } from "svelte/animate";

	export let moveToBoard: (token: TokenType, index: number) => void
	export let sets: TokenType[][]

	function handleBoardDrop(e: MouseEvent): void {
		if (!$selection || sets.some(set => set.includes($selection))) return
		if (e.target === e.currentTarget) {
			const lowestUnusedIndex = sets.map(set => set[0].index).reduce((acc, cur) => cur > acc ? cur : acc, -1) + 1
			moveToBoard($selection, lowestUnusedIndex)
		}
	}
	
	function handleSetDrop(e: MouseEvent, index: number): void {
		if (!$selection || ($selection.belongs === "Board" && $selection.index === index)) return
		moveToBoard($selection, index)
	}

</script>

<div 
	class="board {isValidBoard(sets) ? '' : 'invalid'}" 
	on:mouseup={handleBoardDrop}
>
	{#each sets as set (set[0].index)}
		<div 
			class="set {isGroup(set) ? 'group' : isStair(set) ? 'stair' : 'invalid-set'}" 
			on:mouseup={e => handleSetDrop(e, set[0].index)}
		>
			{#each set as token (token.id)}
				<Token bind:token/>
			{/each}
		</div>
	{/each}
</div>

<style>
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
</style>