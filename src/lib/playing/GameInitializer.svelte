<script lang="ts">
	import { Game } from "$lib/game/logic";
	export let game: Game
	export let totalPlayers = game ? game.totalPlayers : 4

</script>

<main class='h-full flex flex-col justify-center'>
	<slot/>
	<button class='text-5xl p-8 mt-8 bg-white text-secondary' on:click={() => game = new Game(totalPlayers)}> New game </button>
	<label for='players' class='mt-10 mb-2 text-xl opacity-50'> Number of players: </label>
	<input name='players' type="number" bind:value={totalPlayers} class='text-black text-3xl font-bold text-center w-20 opacity-80'>
</main>