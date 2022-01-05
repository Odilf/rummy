<script lang='ts'>
	import { getGame, joinGame } from '$lib/database'
	import { page } from '$app/stores'
import OnlineGame from '$lib/online/OnlineGame.svelte'

	const uid = $page.params.uid

	const game = getGame(uid)

	let joined = false
	$: if (!$game) {
		joined = false
	}

	function join() {
		if (!joined) {
			joinGame(uid, 'ClaraPollasShowtime', $game.players.length)
			joined = true
		} else {
			alert('Already joined to game')
		}
	}

</script>

{#if !$game}
	<p>
		OwO, link doesn't seem to be wowking.
	</p>
	<p>
		I'm <i> (sniffles) </i> sowwy... &#62.&#60;
	</p>
{:else}
	Yooo there's a game in progress, that's dope bro

	<h1>Players:</h1> 
	{#each $game.players as player}
		<li>{player}</li>
	{/each}

	{#if !joined}
		<button on:click={join}> Join game </button>
	{:else}

		{#if !$game.started}
			Waiting for game to start
		{:else}
			Yooo game has started here too

			<OnlineGame tokens={$game.tokens} index={1} {uid}/>
		{/if}

	{/if}
{/if}