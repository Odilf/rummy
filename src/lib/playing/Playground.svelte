<script lang="ts">
	import Board from "$lib/game/Board.svelte"
	import Hand from "$lib/game/Hand.svelte"
	import { Game, Player, Place } from "$lib/game/logic"

	export let playerNames = Player.defaultNames(4)
	let game = new Game(playerNames)

	$: game.players.forEach((player, i) => player.name = playerNames[i])

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

			game.tokens.update(tokens => {
				const token = tokens.find(token => token.id === tokenData.id)
				token.belongs = place
				token.index = index
				return tokens
			})
		}
	}

	function lowestUnusedIndex(): number {
		return Game.getBoard($game).map(set => set[0].index).reduce((acc, cur) => cur > acc ? cur : acc, -1) + 1
	}
</script>

<main class='font-bold rounded m-4 mb-0 flex flex-col sm:flex-row' >
	<div class='flex flex-col h-full sm:py-10'>
		<header class='flex-1 sm:flex-col'>
			<button disabled={game.turn === 0} on:click={() => game.turn--}> Previous </button>
			<h2 class='text-6xl '> {game.players[game.turn].name} </h2>
			<button disabled={game.turn === game.players.length - 1} on:click={() => game.turn++}> Next </button>
		</header>
		<button on:click={() => game.draw(game.turn)} class='justify-self-end bg-secondary/70 py-2'
			disabled={$game.filter(token => token.belongs === Place.Stack).length <= 0}>
			Draw token
		</button>
	</div>

	<Hand hand={Game.getHand($game, game.turn)} index={game.turn} on:drop={handleDrop}/>
</main>

<Board sets={Game.getBoard($game)} on:drop={handleDrop}/>


<button on:click={() => game = null}> Finish game </button>