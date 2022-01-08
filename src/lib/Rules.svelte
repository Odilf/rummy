<script>
	import Set from "$lib/game/Set.svelte";
</script>

<main class="bg-white text-black mt-36 flex flex-col pt-[100px] rounded-t-[100px]">
	<h2 class='text-center font-extrabold text-5xl'> How to play </h2>

	<p class='text-center mt-5'>Join tokens by making sets of either groups or stairs!</p>
	<div class="flex w-full flex-row box-border justify-center flex-wrap">
		<div class="card">
			Groups have tokens with the same value, but different colors.
			<Set tokens={[
				{value: 5, color: 0},
				{value: 5, color: 2},
				{value: 5, color: 5},
			]} index={0}/>
		</div>
		
		<div class="card">
			Stairs are the same color, but have values in ascending order.
			<Set tokens={[
				{value: 2, color: 0},
				{value: 3, color: 0},
				{value: 4, color: 0},
			]} index={1}/>
		</div>
	</div>
	<button class='m-10 drop-shadow-lg' on:click={() => location.href = '/about'}> About </button>

	<slot/>
</main>


<style lang='postcss'>
	.card {
		@apply bg-secondary flex-shrink rounded-xl p-5 m-4 flex flex-col justify-center shadow text-white;
		width: 300px;
	}
</style>