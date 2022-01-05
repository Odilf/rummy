<script lang="ts">
	import { Place, Token } from "$lib/game/logic/token";
	import Hand from "$lib/game/Hand.svelte";
	import { getBoard, getHand, lowestUnusedIndex } from "$lib/game/logic/game";
	import Board from "$lib/game/Board.svelte";
	import { isValidBoard } from "$lib/game/logic/set";
	import { requestDraw, updateTokens } from "$lib/database";

	export let tokens: Token[] = []
	export let index: number
	export let uid: string

	console.log(tokens);

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
				index = lowestUnusedIndex(tokens)
			}

			const token = tokens.find(token => token.id === tokenData.id)
			token.belongs = place
			token.index = index

			tokens = tokens
		}

		if (isValidBoard(getBoard(tokens))) {
			updateTokens(uid, tokens)
		}
	}
	
</script>

<button on:click={() => requestDraw(uid, index)}> Request draw </button>

<Hand hand={getHand(tokens, index)} {index} on:drop={handleDrop}/>

<Board sets={getBoard(tokens)} on:drop={handleDrop}/>