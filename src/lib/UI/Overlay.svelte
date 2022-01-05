<script lang="ts">
	import { fade } from "svelte/transition";
	export let disabled: boolean
	export let fragile = true

	function close() {
		disabled = true
	}
</script>

{#if !disabled}	
<main 
class='fixed inset-0 bg-black/70 z-20 backdrop-blur-xl w-full flex flex-col justify-center items-center backdrop-grayscale {fragile ? 'cursor-pointer' : ''}'
in:fade={{duration: 200}} out:fade|self={{duration: 200}}
on:mousedown|self={() => fragile && close()}>
	<slot {close}/>
</main>
{/if}