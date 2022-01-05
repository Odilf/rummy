<script lang="ts">
	import Overlay from "$lib/UI/Overlay.svelte";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher()
	let disabled = true

	function cancel() {
		closeDialog()
		dispatch('cancel')
	}

	function confirm() {
		closeDialog()
		dispatch('confirm')
	}

	function closeDialog() {
		disabled = true
	}
</script>

<button on:click={() => disabled = false}> <slot {closeDialog}/> </button>

<Overlay bind:disabled>
	<slot name='dialog'>
		<div class='text-6xl font-bold'>
			Are you sure?
		</div>
		<div class='flex m-4 text-xl'>
			<button class='p-2 m-2' on:click={cancel}> Cancel </button>
			<button class='p-2 m-2 text-success' on:click={confirm}> Confirm </button>
		</div>
	</slot>
</Overlay>