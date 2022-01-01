<script lang="ts">
	import GamePreview from './GamePreview.svelte';
	import { savedGames } from './savedGames'
</script>


{#each $savedGames as game}
	<GamePreview savedGame={game}/>
{/each}