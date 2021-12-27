<script lang='ts'>
	import Token from "./Token.svelte"
	import { dropzone } from "$lib/draggable/draggable";
	import { createEventDispatcher } from "svelte";
	import { isGroup, isStair } from "./logic";
	
	export let tokens: { value: number, color: number, id?: number }[] = []
	export let index: number
	
	const dispatch = createEventDispatcher()

	function handler(e) {
		dispatch(e.type, { ...e.detail, setIndex: index })
	}

	$: type = isGroup(tokens) ? 'group' : isStair(tokens) ? 'stair' : 'invalid'
</script>

<div class='first-letter:w-fit flex flex-row rounded-xl w-fit h-fit m-2 shadow-xl bg-white/50 {type}'
use:dropzone on:drop={handler} on:dragenter={handler}>
	{#each tokens as token (token.id)}
		<Token value={token.value} color={token.color} draggable id={token.id}/>
	{/each}
</div>

<style lang='postcss'>
	div {
		transition: all 1s;
		/* @apply bg-primary */
	}
	.invalid {
		@apply shadow-debug bg-debug
	}
	.group {
		@apply shadow-group/30 bg-group/30
	}

	.stair {
		@apply shadow-stair/30 bg-stair/30
	}
</style>