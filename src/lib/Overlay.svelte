<script lang="ts">
	import { fade } from "svelte/transition";
	export let disabled = false
</script>

{#if !disabled}	
<main 
class='fixed inset-0 bg-black/70 z-20 backdrop-blur w-full justify-center'
transition:fade
>
	<slot/>
</main>
{/if}