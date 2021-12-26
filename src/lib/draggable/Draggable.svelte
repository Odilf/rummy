<script lang="ts">
	import { spring } from 'svelte/motion'	
	import { draggable as makeDraggable } from '$lib/draggable/draggable'

	export let draggable = true

	let position = spring({
		x: 0,
		y: 0
	}, { damping: 0.3, stiffness: 0.2 })

	function handleDrag(e) {
		position.set(e.detail)
	}

</script>

{#if draggable}
	<div 
	use:makeDraggable 
	on:drag={handleDrag} 
	on:dragend={() => position.set({x: 0, y: 0})} 
	style='--move: {$position.x}px, {$position.y}px'
	class='movable'
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