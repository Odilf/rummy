<script lang="ts">
	import Playground from '$lib/playing/Playground.svelte';
	import GameInitializer from '$lib/playing/GameInitializer.svelte';
	import Back from '$lib/UI/Back.svelte'
	import { savedGames } from '$lib/playing/savedGames';
	import { Game, Player } from '$lib/game/logic';

</script>

<Back floating/>

<body class='bg-primary'>
	<GameInitializer let:tokens let:players>
		<Playground {players} {tokens}/>
	</GameInitializer>
</body>