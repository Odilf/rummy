<script lang='ts'>
	import { getGame, joinGame } from '$lib/database'
	import { page } from '$app/stores'
	import OnlineGame from '$lib/online/OnlineGame.svelte'
	import { fly } from 'svelte/transition';
	import Spinner from '$lib/UI/Spinner.svelte';
	import { browser } from '$app/env';

	const uid = $page.params.uid
	const game = getGame(uid)

	let index: number

	$: if (!$game) {
		index = null
	}

	function join() {
		if (index == null) {
			index = $game.players.length
			joinGame(uid, username, $game.players.length)
		}

		localStorage.setItem('username', username)
	}

	let username: string = browser ? localStorage.getItem('username') : ''

</script>

<div class='mt-36'/>
{#if $game}
	{#if $game.started}
		<div in:fly={{ y: 100, duration: 400, delay: 400}}>
			{#if $game.players.includes(username)}
				<OnlineGame index={$game.players.indexOf(username)} {uid} {game}/>
			{:else}
				Game already in progress.	
			{/if}
		</div>
	{:else}
		<div out:fly={{ y: 100, duration: 400 }}
		class='flex flex-col items-center'>
			<h1 class='font-light text-7xl'> Game found! </h1>	

			<div class='flex flex-col my-10'>
				<h2 class='font-bold text-3xl m-2'> Players joined so far: </h2>
				{#each $game.players as player}
					<li class='text-xl' transition:fly|local={{ y: 50, duration: 1000}}> {player} </li>
				{/each}
			</div>

			{#if index == null}
				<input bind:value={username} name='username' placeholder='Username' autocomplete="off" on:keydown={e => e.key === 'Enter' && join()}
				class='p-2 m-4 rounded text-xl'>
				<button on:click={join} disabled={!username}>
					Join game
				</button>
			{:else}
				<div> Waiting for game to start </div>
				<Spinner/>
			{/if}
		</div>
	{/if}
{:else}	
	<p>
		OwO, link doesn't seem to be wowking.
	</p>
	<p>
		I'm <i> (sniffles) </i> sowwy... &#62.&#60;
	</p>
{/if}