<script>
	import Set from "$lib/game/Set.svelte";
	import Token from "$lib/game/Token.svelte"

</script>

<main class="bg-white min-w-full text-black flex flex-col min-h-full">
	<h2 class='text-center font-extrabold text-5xl'> How to play </h2>

	<p class='text-center mt-5'>Join tokens by making sets of either groups or stairs!</p>
	<div class="flex w-full flex-row box-border justify-center flex-wrap">
		<div class="card">
			Groups have tokens with the same value, but different colors.
			<Set>
				<Token value={5} color={0}/>
				<Token value={5} color={2}/>
				<Token value={5} color={5}/>
			</Set>
		</div>
		
		<div class="card">
			Stairs are the same color, but have values in ascending order.
			<Set>
				<Token value={2} color={3}/>
				<Token value={3} color={3}/>
				<Token value={4} color={3}/>
			</Set>
		</div>
	</div>
	<button class='m-10 drop-shadow-lg' on:click={() => location.href = '/about'}> About </button>
</main>


<style lang='postcss'>
	.card {
		@apply bg-secondary flex-shrink rounded-xl p-5 m-4 flex flex-col justify-center;
		width: 300px;
	}
</style>