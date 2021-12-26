<script lang='ts'>
	import Token from "$lib/game/Token.svelte";
	import { onMount } from "svelte";

	const tokens = [
		{ value: 4, color: 0, },
		{ value: 5, color: 2, },
		{ value: 12, color: 5, },
		{ value: 3, color: 10, },
		{ value: 6, color: 4, },
		{ value: 1, color: 2, },
		{ value: 7, color: 3, },
	]

	let confetti = new Array(10).fill(0)
		.map((_, i) => {
			return {
				token: tokens[i % tokens.length],
				x: Math.random() * 100,
				y: -20 - Math.random() * 100,
				s: 0.1 + Math.random() * 1,
				r: 360 * Math.random(),
			};
		})
		.sort((a, b) => a.s - b.s);

	onMount(() => {
	let frame: number;

	function loop() {
		frame = requestAnimationFrame(loop);

		confetti = confetti.map(emoji => {
			emoji.y += 0.3 * emoji.s;
			if (emoji.y > 120) emoji.y = -20;
			return emoji;
		});
	}

	loop();

	return () => cancelAnimationFrame(frame);
	});
</script>



<body class='text-xl pt-10 bg-secondary'>
	<main class='z-10'>
		<h1 class='font-extrabold h-fit text-8xl pt-[10%] drop-shadow'> Rummy </h1>
		<p class='text-gray-400 pt-6 drop-shadow'> Play the classic board game online! </p>
		<div class="flex mt-5">
			{#each [
				['Playground', '/playground'],
				['Local turn based', '/local'],
				['FFA online', '/battle'],
			] as [description, link]}
				<button class='p-10 m-2 text-3xl font-black bg-accent/30 backdrop-blur flex-1 drop-shadow'
				on:click={() => location.href = link}> {description} </button>
			{/each}
		</div>
		<button class='m-10 drop-shadow-lg'> About </button>
	</main> 

	{#each confetti as c}
		<span class='absolute select-none -z-0 opacity-50' style="left: {c.x}%; top: {c.y}%; transform: rotate({c.r}deg) scale({c.s})">
			<Token token={{...c.token, belongs: null, index: null, id: null}}/>
		</span>
	{/each}
</body>