<script lang="ts">
	import Board from "$lib/game/Board.svelte"
	import Hand from "$lib/game/Hand.svelte"
	import { Game, Player, Place } from "$lib/game/logic"
	import type { Token } from "$lib/game/logic"

	export let players: Player[]
	export let tokens: Token[]
	let activePlayer: number = 0

	function handleDrop(e) {
		if ('token' in e.detail) {
			const tokenData = e.detail.token

			let index: number
			let place = Place.Board
			if ('setIndex' in e.detail) {
				index = e.detail.setIndex
			} else if ('playerIndex' in e.detail) {
				index = e.detail.playerIndex
				place = Place.Hand
			} else {
				index = lowestUnusedIndex()
			}

			const token = tokens.find(token => token.id === tokenData.id)
			token.belongs = place
			token.index = index

			tokens = tokens
		}
	}

	function lowestUnusedIndex(): number {
		return Game.board(tokens).map(set => set[0].index).reduce((acc, cur) => cur > acc ? cur : acc, -1) + 1
	}
</script>


<main class='font-bold rounded m-4 mb-0 flex flex-col sm:flex-row' >
	<div class='flex flex-col h-full sm:py-10'>
		<header class='flex-1 sm:flex-col'>
			<button disabled={activePlayer === 0} on:click={() => activePlayer--}> Previous </button>
			<h2 class='text-6xl '> {players[activePlayer].name} </h2>
			<button disabled={activePlayer === players.length - 1} on:click={() => activePlayer++}> Next </button>
		</header>
		<button on:click={() => tokens = Game.draw(tokens, activePlayer)} class='justify-self-end bg-secondary/70 py-2'
			disabled={Game.stackSize(tokens) <= 0}>
			Draw token
		</button>
	</div>

	<Hand hand={Game.hand(tokens, activePlayer)} index={activePlayer} on:drop={handleDrop}/>
</main>

<Board sets={Game.board(tokens)} on:drop={handleDrop}/>