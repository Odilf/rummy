<script lang="ts">
	import { spring } from 'svelte/motion'	
	import { makeDraggable } from '$lib/draggable/draggable'

	export let draggable = true
	export let springSettings = { damping: 0.5, stiffness: 0.5 }
	export let broadcast: unknown = null

	let position = spring({
		x: 0,
		y: 0
	}, springSettings)

	function handleDrag(e) {
		position.set(e.detail)
	}

</script>

{#if draggable}
	<div 
	use:makeDraggable={{broadcast}}
	on:drag={handleDrag} 
	on:dragend={() => position.set({x: 0, y: 0})} 
	style='--move: {$position.x}px, {$position.y}px'
	class='movable touch-none h-fit w-fit'
	>
		<slot/>
	</div>
{:else}
	<slot/>
{/if}

<style>
	div {
		transform: translate(var(--move));
	}
</style>