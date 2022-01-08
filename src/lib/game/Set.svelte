<script lang='ts'>
	import { createEventDispatcher } from "svelte";
	import { dropzone } from "$lib/draggable/draggable";
	import Token from "./Token.svelte"
	import { isGroup, isStair } from "./logic/set";
	import type { Token as TokenType } from "./logic/token";
	import { fade } from "svelte/transition";
import { flip } from "svelte/animate";
	
	export let tokens: TokenType[] = []
	export let index: number
	
	const dispatch = createEventDispatcher()

	function handler(e) {
		dispatch(e.type, { ...e.detail, setIndex: index })
	}

	$: type = isGroup(tokens) ? 'group' : isStair(tokens) ? 'stair' : 'invalid'

	// If tokens don't have an id
	$: tokens = tokens.map((token, i) => {
		token.id = token.id || i
		return token
	})
	
</script>

<div class='w-fit flex flex-row rounded-xl flex-wrap h-fit m-2 shadow-xl bg-white/50 {type}'
use:dropzone on:drop={handler} on:dragenter={handler}>
	{#each tokens as token (token.id)}
		<div in:fade animate:flip>
			<Token value={token.value} color={token.color} draggable id={token.id}/>
		</div>	
	{/each}
</div>