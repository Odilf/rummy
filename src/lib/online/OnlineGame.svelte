<script lang="ts">
	import { Place, Token } from "$lib/game/logic/token";
	import Hand from "$lib/game/Hand.svelte";
	import { draw, getBoard, getHand, lowestUnusedIndex } from "$lib/game/logic/game";
	import Board from "$lib/game/Board.svelte";
	import { isValidBoard } from "$lib/game/logic/set";
	import { updateTokens } from "$lib/database";
	import { createSnackbar } from "$lib/utils/snackbar";
import { clone } from "$lib/utils";

	export let tokens: Token[] = []
	export let index: number
	export let uid: string
	export let drawDelay: number

	let lastValidState: Token[] = clone(tokens)
	let canDraw = true
	let insistCount = 0

	$: console.log('last valid state', lastValidState, index, getHand(lastValidState, index))

	console.log(tokens);

	function handleDrop(e) {
		if ('token' in e.detail) {
			const tokenData = e.detail.token

			let tokenIndex: number
			let place = Place.Board
			if ('setIndex' in e.detail) {
				tokenIndex = e.detail.setIndex
			} else if ('playerIndex' in e.detail) {
				if (!getHand(lastValidState, index).map(token => token.id).includes(tokenData.id)) {
					console.log('Not my token!', tokenData, tokenIndex, getHand(lastValidState, index).map(token => token.id), lastValidState);
					return
				}

				tokenIndex = e.detail.playerIndex
				place = Place.Hand
			} else {
				tokenIndex = lowestUnusedIndex(tokens)
			}

			const token = tokens.find(token => token.id === tokenData.id)
			token.belongs = place
			token.index = tokenIndex

			tokens = tokens
		}

		if (isValidBoard(getBoard(tokens))) {
			lastValidState = clone(tokens)
			updateTokens(uid, tokens)
		}
	}

	function attemptDraw() {
		if (canDraw) {
			updateTokens(uid, draw(tokens, index))
			canDraw = false
			setTimeout(() => {
				canDraw = true
				insistCount = 0
			}, drawDelay)
		} else {
			insistCount += 1
			if (insistCount < 3) {
				createSnackbar( { message: 'Cooldown hasn\'t finished', lifetime: 1000 })
			} else if (insistCount === 3) {
				createSnackbar( { message: 'Yoooo bro chill for a moment', lifetime: 2500 })
			}
		}
	}
	
</script>

<svelte:window on:keydown={e => e.code === 'Space' && attemptDraw()}/>

<div class='flex flex-col items-center pb-32'>
	<div class='sticky top-2 z-10 bg-secondary p-4 m-2 rounded-xl overflow-hidden shadow'>
		<button on:click={attemptDraw}>
			Draw
		</button>

		<div class='absolute bg-tertiary/50 pointer-events-none {canDraw ? '' : 'reload'}' style='--drawDelay: {drawDelay}ms'/> 
	</div>
	
	<Hand hand={getHand(tokens, index)} {index} on:drop={handleDrop}/>
	
	<Board sets={getBoard(tokens)} on:drop={handleDrop}/>
</div>

<style>
	.reload {
		inset: 0;
		animation: load var(--drawDelay) ease;
	}
	@keyframes load {
		from {
			top: 0px;
		}

		to {
			top: 100%;
		}
	}
</style>