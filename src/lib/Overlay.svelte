<script lang="ts">
	import { fade } from "svelte/transition";
	export let disabled = false
</script>

{#if !disabled}	
<main 
class='fixed inset-0 bg-black/70 z-20 backdrop-blur-xl w-full flex flex-col justify-center items-center backdrop-grayscale'
transition:fade={{duration: 200}}
on:click|self={() => disabled = true}>
	<slot/>
</main>
{/if}