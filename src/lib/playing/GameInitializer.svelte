<script lang='ts'>
	import { fade, fly } from "svelte/transition";
	import Counter from "$lib/UI/Counter.svelte";
	import Dialog from "$lib/UI/Dialog.svelte";
	
	import type { Token } from '$lib/game/logic/token'
	import type { Player } from '$lib/game/logic/player'
	import { newGame } from '$lib/game/logic/game'
	import { savedGames } from "./saving/savedGames";

	import Overlay from "$lib/Overlay.svelte";
	import GameGallery from "./saving/GameGallery.svelte";


	export let started = false
	let showOptions = false
	let browsingGames = false
	
	let totalPlayers: number = 4
	let players: Player[] = []
	let tokens: Token[] = []

	let savedName: string = ''

	$: while (players.length < totalPlayers) {
		players = [...players, { name: '', index: players.length }]
	}
	
	
	function start() {
		started = true
		tokens = newGame(players)
		players = players.map(player => {
			player.name = player.name || `Player ${player.index + 1}`
			return player
		})
	}

	function end() {
		started = false
	}

	function save() {
		started = false
		$savedGames = [...$savedGames, {
			tokens,
			players,
			date: new Date(),
			name: savedName,
		}]

		savedName = ''
	}

</script>
{#if started}
	<div class='flex flex-col items-center'
	out:fly={{ y: 200, duration: 700 }} 
	in:fade={{ duration: 200, delay: 500 }}>
		<slot {players} {tokens}/>
		<button on:click={end} class='mt-4'> Finish game </button>
		<!-- Save dialog -->
		<Dialog let:closeDialog>
			<div class='mt-4 opacity-70'> Save game for later </div>
			<div slot='dialog' class='flex flex-col items-center'>
				<h2 class='text-5xl font-bold m-4'> Save game </h2>
				<input placeholder='Save game as...' bind:value={savedName} class='p-2 mt-4 mb-1 rounded text-black'>
				<div class='mx-auto w-fit opacity-30 mb-4'> On {new Date().toDateString()} </div>
				<div class="flex justify-evenly w-full text-xl">
					<button on:click={closeDialog}> Cancel </button>
					<button class='font-bold' on:click={save}> Save </button>
				</div>
			</div>
		</Dialog>
	</div>
	
{:else}

	<main class='min-h-full flex flex-col items-center' 
	in:fly={{ x: 200, duration: 500, delay: 700 }}
	out:fly={{ x: 200, duration: 500 }}>
		<slot name='menu'/>
		<button class='text-5xl p-5 w-4/5 sm:p-8 mt-8 bg-white text-secondary' on:click={start}>
			Start new game
		</button>

		<Dialog>
			<button class='m-2' on:click={() => browsingGames = true}>
				Saved games
			</button>
			<div slot='dialog'>
				<GameGallery/>
			</div>
		</Dialog>

		<label for='players' class='mt-10 mb-2 text-xl opacity-70'>
			Number of players:
		</label>

		<Counter bind:value={totalPlayers}/>

		<button class='bg-secondary p-2 px-4 mt-4' on:click={() => showOptions = !showOptions}>
			{showOptions ? 'Hide' : 'More'} options
		</button>
		{#if showOptions}
			<div class='flex flex-wrap justify-evenly bg-white p-10 rounded-t-3xl rounded-b-xl m-3 w-full'
			transition:fly={{y: 300}}>
				<div class='flex flex-col m-4'>
					<h3 class='text-black'>
						Player names
					</h3>
					{#each players.slice(0, totalPlayers) as player, i}
						<input bind:value={player.name} placeholder='Player {i + 1}' in:fly
						class='text-black text-center my-2 py-2 rounded shadow border-2 border-black/20'>
					{/each}
					<button class='text-black text-2xl' on:click={() => totalPlayers++}> + </button>
				</div>

				<!-- <div class='flex flex-col m-4'>
					<h3 class='text-black'>
						Tokens
					</h3>
					<Counter> Tokens per player </Counter>
					<Counter> Token range </Counter>
					<Counter> Color range </Counter>
				</div> -->
			</div>
		{/if}
	</main>
{/if}

<style lang=postcss>
	h3 {
		@apply font-bold text-xl
	}
</style>