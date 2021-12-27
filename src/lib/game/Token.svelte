<script lang="ts">
	import Draggable from '$lib/draggable/Draggable.svelte'


	export let color: number
	export let value: number
	export let id: number = null

	export let draggable = true

	let hovering = false
	let shifting = false

	// https://api.color.pizza/v1/00ff00

	$: angle = (color % 4)*360/4 + 90*(1 - 1/(2**Math.floor(color/4)))
	$: htmlColor = `hsl(${angle}, 30%, 50%)`


	async function getColorName(h, s, l) {
		console.warn('Using color API');
		const response = await fetch(`https://api.color.pizza/v1/${hslToHex(h, s, l)}`)
							  .then(response => response.json())
			
		return response.colors[0].name
	}

	function hslToHex(h, s, l) {
		l /= 100;
		const a = s * Math.min(l, 1 - l) / 100;
		const f = n => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
		};
		return `${f(0)}${f(8)}${f(4)}`;
	}

	
	

</script>

<svelte:window on:keydown={e => e.shiftKey && (shifting = true)} on:keyup={e => shifting = false}/>

<Draggable {draggable} broadcast={{ token: { color: color, value: value, id: id }}}>
	<div class="
	 bg-white flex flex-col items-center p-2 sm:p-4 m-1 font-black text-4xl rounded-xl select-none shadow-md
	{draggable ? 'hover:scale-105 cursor-pointer' : ''} transition-all
	"
	style='color: {htmlColor}'
	on:mouseenter={() => hovering = true}
	on:mouseleave={() => hovering = false}
	>
		{value}
		{#if hovering && shifting}
			<div class="absolute inset-0 bg-black bg-opacity-50 ronded-xl">
				{#await getColorName(angle, 30, 50)}
					Loading
				{:then colorName} 
					{colorName}
				{/await}
			</div>
		{/if}
		<!-- Circle -->
		<div class="w-[35px] h-[35px] rounded-full" style='box-shadow: inset 0 0 4px hsla(0, 0%, 0%, 0.15);'/>
	</div>
</Draggable>