<script lang="ts">
	export let value: number = 0
	export let min: number = 0
	export let max: number = 100

	$: while (value < min) {
		value++
	}

	$: while (value > max) {
		value--
	}
</script>
	
<h3 class='text-black'> <slot/> </h3>
<div class='flex text-3xl drop-shadow'>
	<button class='mx-4' on:click={() => value--}> - </button>
	<input name='players' type="number" bind:value class='text-black font-bold text-center w-20 opacity-80 rounded py-2'>
	<button class='mx-4' on:click={() => value++}> + </button>
</div>