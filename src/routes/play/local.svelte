<script lang="ts">
	import LocalPlay from '$lib/playing/LocalPlay.svelte';
	import GameInitializer from '$lib/playing/GameInitializer.svelte';
	import Back from '$lib/UI/Back.svelte'
</script>

<Back />

<GameInitializer let:tokens let:players>
	<h1 class='text-6xl sm:text-8xl my-10 drop-shadow mt-16 sm:mt-32' slot='menu'>
		Local Play
	</h1>
	<LocalPlay {tokens} {players}/>
</GameInitializer>