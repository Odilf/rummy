<script lang="ts">
	import type { Token as TokenType } from './logic'
	import { selection } from './state';
	import Token from './Token.svelte'

	export let hand: TokenType[]
	export let index: number
	// export let draw: () => void
	// export let passTurn: () => void = () => null

	export let moveToHand: (token: TokenType, playerIndex: number) => void = () => null
	export let acceptList: TokenType[] = []

	function handleDrop() {
		
		if ($selection && acceptList.includes($selection)) {
			moveToHand($selection, index)
		}
	}

	console.log(hand);
	
</script>

<!-- <main> -->
	<section class='hand' on:mouseup={handleDrop}>
		{#each hand as token (token.id) }
			<Token bind:token/>
		{/each}
	</section>
<!-- </main> -->

<style>
	
	.hand {
		display: flex;
		flex-wrap: wrap;
		background-color: hsl(10, 20%, 30%);

		margin-top: 0.5em;
		border-radius: 20px;

		box-shadow: var(--shadow);
	}
</style>