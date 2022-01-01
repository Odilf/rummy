<script lang='ts'>
	import { createEventDispatcher } from "svelte";
	import { dropzone } from "$lib/draggable/draggable";
	import Token from "./Token.svelte"
	import { TokenSet } from "./logic";
	import type { Token as TokenType } from "./logic";
	import { fade } from "svelte/transition";
	
	export let tokens: TokenType[] = []
	export let index: number
	
	const dispatch = createEventDispatcher()

	function handler(e) {
		dispatch(e.type, { ...e.detail, setIndex: index })
	}

	$: type = TokenSet.isGroup(tokens) ? 'group' : TokenSet.isStair(tokens) ? 'stair' : 'invalid'

	// If tokens don't have an id
	$: tokens = tokens.map((token, i) => {
		token.id = token.id || i
		return token
	})
	
</script>

<div class='first-letter:w-fit flex flex-row rounded-xl w-in h-fit m-2 shadow-xl bg-white/50 {type}'
use:dropzone on:drop={handler} on:dragenter={handler}>
	{#each tokens as token (token.id)}
		<div in:fade>
			<Token value={token.value} color={token.color} draggable id={token.id}/>
		</div>	
	{/each}
</div>

<style lang='postcss'>
	div {
		transition: all 1s;
		/* @apply bg-primary */
	}
	.invalid {
		/* @apply shadow-debug bg-debug */
	}
	.group {
		/* @apply shadow-group/30 bg-group/30 */
	}

	.stair {
		/* @apply shadow-stair/30 bg-stair/30 */
	}
</style>