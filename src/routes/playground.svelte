<script context="module">
	export const ssr = false;
</script>

<script lang="ts">
	import Token from '$lib/game/Token.svelte'
	import Hand from '$lib/game/Hand.svelte'
	import Board from '$lib/game/Board.svelte';
	import { Game } from '$lib/game/logic'

	let game: Game
	let board
	let players
	let stack 

	$: if (game) {
		board = game.board
		players = game.players
		stack = game.stack
	}

	let activePlayer = 0
	
</script>

<main>
{#if game}
	<h1> Rummy! </h1>
	
	<section>
		<Board sets={$board} moveToBoard={game.moveToBoard}/>
		
		
		
		<div class="hand">
			
			<header>
				<button disabled={activePlayer === 0} on:click={() => activePlayer--}> Previous </button>
				
				<div class="center">
					<select bind:value={activePlayer}> 
						{#each $players as player, i}
						<option value={i}> Player {i} </option>
						{/each}
					</select>
					<h2> Player {activePlayer} </h2>
					<button on:click={() => {
						game.draw(activePlayer)
					}}>
						Draw
					</button>
				</div>
				
				<button disabled={activePlayer === $players.length - 1} on:click={() => activePlayer++}> Next </button>
				
			</header>
			
			<Hand
			hand={$players[activePlayer]} index={activePlayer}
			moveToHand={game.moveToHand}
			acceptList={$board.flat()}
			/>
		</div>
		
		<section class='stack-container'>
			<h2> Stack </h2>
			<div class="stack">
				{#each $stack as token}
					<Token value={token.value} color={token.color}/>
				{/each}
			</div>
		</section>
	</section>
{:else}
	<h1> Rummy! </h1>
	<button class='start' on:click={() => game = new Game(4)}> START GAME </button>
{/if}
</main>

<style>
	.start {
		width: 300px;
		height: 100px;

		font-size: 2em;
		font-weight: 700;
	}
	.hand {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		background-color: hsl(9, 20%, 19%);
		border-radius: 20px;
		margin: 1em;
	}

	header {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 80%;
		padding: 1em;
	}

	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	section {
		display: flex;
		flex-direction: column;
	}

	.stack-container {
		width: min(650px, 95vw);
	}

	.stack {
		display: flex;
		align-items: center;

		overflow: scroll;
	}

	button {
		height: 2em;
		width: 6em;
	}
</style>