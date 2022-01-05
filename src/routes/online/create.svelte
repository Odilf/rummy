<script>
	import { uid as generateUid } from "uid";
	import { browser } from "$app/env";
	import { createGame, getGame, startGame } from "$lib/database";
	import OnlineGame from "$lib/online/OnlineGame.svelte";
	import { fly } from "svelte/transition";
	import GameSettings from "$lib/playing/GameSettings.svelte";
	import { snackbar } from "$lib/utils/snackbar";

	// const uid = generateUid()
	const uid = 'caca'
	const link = browser ? `${window.location.host}/online/game-${uid}` : 'caca'

	let username

	const game = getGame(uid)
	$: if ($game && !$game.players) {
		$game.players = []
	}

	$: console.log($game && $game)
</script>


<h1 class='text-6xl mt-36'> Create an online game </h1> 

{#if !$game}

	<input bind:value={username} name='username' placeholder='Username' autocomplete="off"
	class='p-2 m-4 rounded text-xl'>
	<button on:click={() => createGame(uid, username)} disabled={!username}
		class='bg-secondary p-4 m-4 text-3xl font-bold'>
		Create game
	</button>
	You will be able to send a link once you create the game

	<div class='flex flex-col opacity-50 m-10'>
		Or join a game via an ID
		<input class=''>
		<button formaction='game-caca'> Search </button>
	</div>
	
{:else}

	{#if !$game.started}
		<div class='p-5 flex flex-col' transition:fly={{ duration: 200, y: 200 }}>
			<h2 class='text-3xl font-bold'> Game created! </h2>

			<button on:click={() => navigator.clipboard.writeText(link)}
				use:snackbar={{ message: 'Link copied to clipboard!', lifetime: 1500}}>
				Copy link 
			</button>

			{#each $game.players as player}
				{player}
			{/each}
			
			<button on:click={() => startGame(uid, $game.players)}> Start game </button>

			<GameSettings/>
		</div>

	{:else}

		<OnlineGame tokens={$game.tokens} index={0} {uid}/>

	{/if}
{/if}

<span class='absolute bottom-0 m-2 opacity-25'> Current uid is {uid} </span>