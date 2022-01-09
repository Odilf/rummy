<script lang="ts">
	export let value: number = 0
	export let min: number = -Infinity
	export let max: number = Infinity

	$: while (value < min) {
		value++
	}

	$: while (value > max) {
		value--
	}
</script>
	
<div class='flex m-2 h-fit'>
	<h3 class='text-black flex items-center text-right'> <slot/> </h3>
	<div class='flex text-3xl drop-shadow text-black'>
		<button class='mx-4' on:click={() => value--}> - </button>
		<input name='players' type="number" bind:value class='bg-black text-white font-bold text-center w-20 opacity-80 rounded py-2'>
		<button class='mx-4' on:click={() => value++}> + </button>
	</div>
</div>