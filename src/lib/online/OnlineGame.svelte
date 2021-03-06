<script lang="ts">
	import WinScreen from './WinScreen.svelte';
	import { isEqual, Place, Token } from "$lib/game/logic/token";
	import Hand from "$lib/game/Hand.svelte";
	import { draw, getBoard, getHand, lowestUnusedIndex } from "$lib/game/logic/game";
	import Board from "$lib/game/Board.svelte";
	import { isValidBoard } from "$lib/game/logic/set";
	import { getGame, updateTokens, win } from "$lib/database";
	import { createSnackbar } from "$lib/utils/snackbar";
	import { clone } from "$lib/utils";

	export let index: number
	export let uid: string
	export let game = getGame(uid)

	let tokens: Token[]
	let lastValidState: Token[]

	let wzoom = new Audio('/sounds/wzoom.mp3')
	wzoom.volume = 0.3

	$: {
		if (getBoard($game.tokens).length !== getBoard(lastValidState).length) {
			wzoom.currentTime = 0
			wzoom.play()
			console.log('Should have played');
		}
		lastValidState = clone($game.tokens)
		
	}
	$: tokens = clone(lastValidState)

	let canDraw = true
	let insistCount = 0

	$: if (getHand(lastValidState, index).length === 0 && !$game.winner) {
		win(uid, $game.players[index])
	}


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
			tokens = clone(tokens)
		}

		const board = getBoard(tokens)

		if (isValidBoard(board) && !lastValidState.every((token, i) => isEqual(token, tokens[i]))) {
			updateTokens(uid, tokens)
			createSnackbar({ message: 'Commited!' })
		}
	}

	function attemptDraw() {
		if (canDraw) {
			tokens = draw(tokens, index)
			updateTokens(uid, tokens)
			canDraw = false
			setTimeout(() => {
				canDraw = true
				insistCount = 0
			}, $game.options.drawDelay * 1000)
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

{#if $game}
	<div class='flex flex-col items-center pb-32'>
		{#if !$game.winner}
			<header class='sticky top-2 z-10 flex'>
				<div class='relative bg-tertiary m-2 rounded-xl overflow-hidden shadow-xl'>
					<button on:click={attemptDraw} class='w-full h-full p-4' disabled={!canDraw}>
						Draw
					</button>
					<div class='absolute bg-secondary/50 pointer-events-none {canDraw ? '' : 'reload'}'
					style='--drawDelay: {$game.options.drawDelay}s'/>
				</div>
				<button class='bg-tertiary m-2 p-4' on:click={() => tokens = clone(lastValidState)}>
					Reset board
				</button>
			</header>
			
			<div class='w-full max-w-[960px]'>
				<Hand hand={getHand(tokens, index)} {index} on:drop={handleDrop}/>
				
				<Board sets={getBoard(tokens)} on:drop={handleDrop}/>
			</div>
		{:else}
			<WinScreen winner={$game.winner} isWinner={$game.winner === $game.players[index]}/>
		{/if}
	</div>
{/if}

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