<script>
	import { uid as generateUid } from "uid";
	import { browser } from "$app/env";
	import { createGame, getGame, startGame } from "$lib/database";
import Board from "$lib/game/Board.svelte";
import { getBoard, getHand } from "$lib/game/logic/game";
import Hand from "$lib/game/Hand.svelte";
import OnlineGame from "$lib/online/OnlineGame.svelte";

	const uid = generateUid()
	const link = browser ? `${window.location.host}/online/game-${uid}` : 'caca'

	let username

	const game = getGame(uid)

	$: console.log($game && $game.players)
</script>


{#if !$game}

	<input bind:value={username}>
	<button on:click={() => createGame(uid, username)}> Create game </button>
	
{:else}

	{#if !$game.started}		
		<button on:click={() => navigator.clipboard.writeText(link)}> Copy link </button>
		
		Game is {JSON.stringify($game)}
		
		<button on:click={() => startGame(uid, $game.players)}> Start game </button>
	{:else}
		Yoo the game has started!

		<OnlineGame tokens={$game.tokens} index={0} {uid}/>

	{/if}
{/if}

Current uid is {uid}