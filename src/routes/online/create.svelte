<script context='module'>
	export const prerender = true;
</script>

<script>
	import { uid as generateUid } from "uid";
	import { browser } from "$app/env";
	import { createGame, getGame, startGame } from "$lib/database";
	import OnlineGame from "$lib/online/OnlineGame.svelte";
	import { fly } from "svelte/transition";
	import GameSettings from "$lib/playing/GameSettings.svelte";
	import { snackbar } from "$lib/utils/snackbar";

	const uid = generateUid()
	const link = browser ? `${window.location.host}/online/game-${uid}` : 'caca'

	let username = browser ? localStorage.getItem('username') : ''
	let options
	let onlineOptions = { drawDelay: 2 }

	$: browser && localStorage.setItem('username', username)

	const game = getGame(uid)
	$: if ($game && !$game.players) {
		$game.players = []
	}
</script>

<div class='mt-36'/>
{#if $game}
	{#if $game.started}
		<div in:fly={{ y: 100, duration: 400, delay: 500 }}>
			<OnlineGame index={0} {uid} {game}/>
		</div>
	{:else}
		<div class='p-5 flex flex-col items-center' in:fly={{ duration: 500, y: 50, delay: 500 }} out:fly={{ duration: 500, y: 50 }}>
			<h2 class='text-6xl font-light text-center m-6 drop-shadow'> Game created! </h2>
			
			<div class='flex flex-col sm:flex-row items-center'>
				<button on:click={() => navigator.clipboard.writeText(link)} use:snackbar={{ message: 'Link copied to clipboard!', lifetime: 1500}}
				class='bg-white text-black m-2 p-4 font-bold flex items-center text-2xl w-full sm:w-fit'>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
				</svg>
					Invite
				</button>

				<button on:click={() => startGame(uid, $game.players, options, onlineOptions)}
				class='bg-white text-black m-2 p-4 font-bold flex items-center text-2xl w-full sm:w-fit'>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
					Start game
				</button>
			</div>

			<div class='flex flex-col my-10'>
				<h2 class='font-bold text-3xl m-2'> Players joined so far: </h2>
				{#each $game.players as player}
					<li class='text-xl' transition:fly|local={{ y: 50, duration: 1000}}> {player} </li>
				{/each}
			</div>

			<GameSettings bind:options bind:onlineOptions/>
		</div>
	{/if}
{:else}
	<div out:fly={{ duration: 200, y: -50 }}
	class='flex flex-col items-center'>
		<h1 class='text-6xl text-center font-bold my-4 drop-shadow'> Create an online game </h1>
		<input bind:value={username} name='username' placeholder='Username' autocomplete="off"
		class='p-2 m-4 rounded text-xl'>
		<button on:click={() => createGame(uid, username)} disabled={!username}
			class='bg-secondary p-4 m-4 text-3xl font-bold'>
			Create game
		</button>
		<span class='m-4 text-center'>You will be able to send a link once you create the game</span>
	</div>
{/if}

<span class='sticky bottom-2 m-2 opacity-25'> Current uid is {uid} </span>