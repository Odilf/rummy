<script context="module">
	export const prerender = true;
</script>

<script lang='ts'>
	import Token from "$lib/game/Token.svelte";
	import Rules from "$lib/Rules.svelte";

	let showConfetti = true 
	let confetti = new Array(50).fill(0)
		.map(() => {
			const i = Math.random()
			const x = i < 0.5 ? i**(1.5) : 1 - (1 - i)**(1.5)

			return {
				token: { value: Math.floor(Math.random() * 12), color: Math.floor(Math.random() * 5)},
				x: x * 100,
				y: -20 - Math.random() * 100,
				s: 0.1 + Math.random() * 1.5,
				r: 360 * Math.random(),
			};
		}).sort((a, b) => a.x - b.x)
		
</script>

<main class='z-10 flex flex-col items-center relative'>
	<h1 class='pt-[10%] drop-shadow text-8xl'> Rummy </h1>
	<p class='text-gray-400 pt-6 drop-shadow'> Play the classic board game online! </p>
	<div class="flex mt-5 flex-col md:flex-row">
		{#each [
			['Playground', 'play/playground'],
			['Online', '/online/create'],
			['Local turn based', 'play/local'],
		] as [description, link]}
			<button class='p-10 m-2 text-3xl font-bold bg-secondary backdrop-blur flex-1 drop-shadow'
			on:click={() => location.href = link}> {description} </button>
		{/each}
	</div>

	<Rules>
		<div class='pb-[500px]'/>
	</Rules>
</main> 

{#if showConfetti}	
	{#each confetti as c}
		<span class='absolute select-none -z-0' 
		style="left: {c.x}%; transform: rotate({c.r}deg) scale({c.s}); --duration: {30/(c.s + 5)}s; --delay: {c.s * 10 - 100}s"
		>
			<Token draggable={false} value={c.token.value} color={c.token.value}/>
		</span>
	{/each}
{/if}


<style>
	span {
		animation: var(--duration) infinite ease-in drop;
		animation-delay: var(--delay);
		top: 0px;
	}

	@keyframes drop {
		from {
			opacity: 80%;
			top: -20%;
		}

		to {
			opacity: 0%;
			top: 120%;
		}
	}
</style>