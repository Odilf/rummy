<script lang="ts">
	import type { Token as TokenType } from './logic/token'
	import Token from './Token.svelte'
	import { dropzone } from "$lib/draggable/draggable";
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	export let hand: TokenType[]
	export let index: number

	const dispatch = createEventDispatcher()

	function handler(e) {
		dispatch(e.type, {...e.detail, playerIndex: index})
	}
</script>

<section class='flex flex-wrap p-1 sm:p-3 m-1 w-full min-h-[100px] sm:w-4/5 bg-secondary rounded-lg' use:dropzone on:drop={handler} on:dragenter={handler}>
	{#each hand as token (token.id) }
	<div animate:flip={{duration: 300}} in:fade>
		<Token value={token.value} color={token.color} id={token.id} draggable/>
	</div>
	{/each}
</section>