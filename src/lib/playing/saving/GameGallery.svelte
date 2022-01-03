<script lang="ts">
	import GamePreview from './GamePreview.svelte';
	import { savedGames } from './savedGames'
</script>

<h1 class="text-7xl drop-shadow p-4 text-center"> Saved Games </h1> 
<div class='flex flex-wrap justify-center p-4 overflow-show'>
	{#each $savedGames as game (game.date)}
		<GamePreview savedGame={game}/>
	{:else}
		<span class='opacity-50 w-full text-center'> No games in memory </span>
	{/each}
</div>