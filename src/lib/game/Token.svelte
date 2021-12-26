<script lang="ts">
	import { selection, mousePosition, scroll } from './state'
	import type { Token } from './logic'
	import { spring } from 'svelte/motion'
	
	export let token: Token

	let div: HTMLElement
	$: rect = token && (div ? div.getBoundingClientRect() : { x: 0, y: 0 })

	let vectorToMouse = spring({ x: 0, y: 0 }, { damping: 0.4, stiffness: 0.3})

	$: selected = $selection === token ? true : false

	$: {
		if (div && selected) {
			vectorToMouse.set({
				x: $mousePosition.x - rect.x - (div.clientWidth/2) + $scroll.x,
				y: $mousePosition.y - rect.y - (div.clientHeight/2) + $scroll.y,
			})
		} 
		else {
			vectorToMouse.set( {x: 0, y: 0} )
		}
		// token.belongs
	}

	const colors = [
		'0, 30%, 50%',
		'90, 30%, 50%',
		'180, 30%, 50%',
		'270, 30%, 50%',
	]

	function color(index: number) {
		const angle = (index % 4)*360/4 + 90/(2**Math.floor(index/4))
		return `${angle}, 30%, 50%`
	}

</script>

<svelte:window on:mouseup={() => $selection = null}/>

<div 
	class='movable {selected ? 'selected' : ''}'
	style='--move: {$vectorToMouse.x}px, {$vectorToMouse.y}px'
	on:mousedown={() => $selection = token}
	on:touchstart={() => $selection = token}
>
	<div class='token' style='--color: {color(token.color)}' bind:this={div}>
		{token.value}
		<div class="circle"/>
	</div>
</div>

<style>
	.movable {
		transform: translate(var(--move));
	}

	.circle {
		width: 35px;
		height: 35px;

		box-shadow: inset 0 0 4px hsla(0, 0%, 0%, 0.15);
		border-radius: 100%;
	}
	
	.selected {
		pointer-events: none;
	}

	.token {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: column;

		background-color: hsla(0, 0%, 100%, 0.9);
		backdrop-filter: blur(10px);
		color: hsl(var(--color));

		width: 60px;
		height: 100px;

		font-size: 2rem;
		font-weight: 900;

		border-radius: 20px;

		box-shadow:  0 0 7px hsla(var(--color), 50%);

		margin: 0.2em;

		/* text-shadow: 0 0 3px var(--color); */
		user-select: none;
		cursor: pointer;

		transition: all 0.3s;
	}

	.token:hover {
		transform: scale(1.05);
	}
</style>