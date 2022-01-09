<script lang="ts">
	import JSConfetti from 'js-confetti'
	import { browser } from "$app/env";
import { fly } from 'svelte/transition';
import { onDestroy } from 'svelte';

	export let winner: string
	export let isWinner: boolean
	
	const confetti = browser && new JSConfetti()
	let timer
	function yay() {
		confetti.addConfetti()
		timer = setTimeout(yay, Math.random() * 3000 + 1000)
	}

	yay()
	onDestroy(() => clearTimeout(timer))
	
</script>

<h1 class='text-6xl text-center'> Winner is {winner}! </h1>
{#if !isWinner} 
	<span class='opacity-50 m-4'> And you are a loser </span>
{/if}

<button class='bg-black p-4 m-8' transition:fly={{ y: 100, duration: 1500, delay: 2000}}
on:click={() => location.href = '/'}> Home </button>