<script>
	import Set from "$lib/game/Set.svelte";
</script>

<main class="bg-white text-black mt-36 max-w-[680px] flex flex-col pt-[100px] rounded-t-[100px]">
	<h2 class='text-center font-extrabold text-5xl m-4'> How to play </h2>

	<div class="flex w-full flex-row box-border justify-center flex-wrap">
		<div class="card">
			You are dealt a hand 14 tokens. The winner is the first player that has no tokens left in his hand
			<svg xmlns="http://www.w3.org/2000/svg" class="h-20 rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
			</svg>
		</div>

		<div class="card">
			You can drop tokens on the board by making stairs and groups.
		</div>

		<div class="card">
			Stairs have tokens of the same color and have values in ascending order.
			<Set tokens={[
				{value: 2, color: 0},
				{value: 3, color: 0},
				{value: 4, color: 0},
			]} index={1}/>
		</div>

		<div class="card">
			Groups have tokens with the same value and different colors.
			<Set tokens={[
				{value: 5, color: 0},
				{value: 5, color: 2},
				{value: 5, color: 5},
			]} index={0}/>
		</div>

		<div class="card">
			You can rearrange tokens on the board and drop from your hand if the final state is valid
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