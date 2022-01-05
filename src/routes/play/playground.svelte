<script lang="ts">
	import Playground from '$lib/playing/Playground.svelte';
	import GameInitializer from '$lib/playing/GameInitializer.svelte';
	import Back from '$lib/UI/Back.svelte'
</script>

<Back />

<body class='bg-primary'>
	<GameInitializer let:tokens let:players>
		<h1 class='text-6xl sm:text-8xl my-10 drop-shadow mt-16 sm:mt-32' slot='menu'>
			Playground
		</h1>
		<Playground {players} {tokens}/>
	</GameInitializer>
</body>