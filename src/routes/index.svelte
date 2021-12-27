<script lang='ts'>
	import Token from "$lib/game/Token.svelte";
	import Rules from "$lib/Rules.svelte";

	const tokens = [
		{ value: 4, color: 0, },
		{ value: 5, color: 2, },
		{ value: 12, color: 5, },
		{ value: 3, color: 10, },
		{ value: 6, color: 4, },
		{ value: 1, color: 2, },
		{ value: 7, color: 3, },
	]

	let showConfetti = true 
	let confetti = new Array(20).fill(0)
		.map(() => {
			const i = Math.random()
			const x = i < 0.5 ? i**2 : 1 - (1 - i)**2

			return {
				token: { value: Math.floor(Math.random() * 12), color: Math.floor(Math.random() * 5)},
				x: x * 100,
				y: -20 - Math.random() * 100,
				s: 0.1 + Math.random() * 1.5,
				r: 360 * Math.random(),
			};
		}).sort((a, b) => a.x - b.x)

		console.log(confetti);
		
</script>



<body class='text-xl pt-10 bg-primary overflow-x-hidden'>
	<main class='z-10'>
		<h1 class='pt-[10%] drop-shadow'> Rummy </h1>
		<p class='text-gray-400 pt-6 drop-shadow'> Play the classic board game online! </p>
		<div class="flex mt-5 flex-col md:flex-row">
			{#each [
				['Playground', '/playground'],
				['Local turn based', '/local'],
				['FFA online', '/battle'],
			] as [description, link]}
				<button class='p-10 m-2 text-3xl font-bold bg-secondary/50 backdrop-blur flex-1 drop-shadow'
				on:click={() => location.href = link}> {description} </button>
			{/each}
		</div>

		<div class='rounded-t-full bg-white min-h-[100px] min-w-full mt-20'></div>
		<Rules/>
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
	
</body>

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