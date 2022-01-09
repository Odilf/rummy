<script lang="ts">
	import Draggable from '$lib/draggable/Draggable.svelte'
	import { fly, crossfade } from 'svelte/transition';
	import { colorNames } from './colorNames'

	export let color: number
	export let value: number
	export let id: number = 69

	export let draggable = true

	const [ send, recieve ] = crossfade({
		duration: d => 2*d,
	})

	let hovering = false
	let timeout

	$: angle = (color % 4)*360/4 + 90*(1 - 1/(2**Math.floor(color/4)))
	$: htmlColor = `hsl(${angle}, 30%, 50%)`

	async function getColorName(h, s, l) {
		const hex = hslToHex(h, s, l)
		if ($colorNames[hex]) return ($colorNames[hex])

		console.warn('Using color API');
		const response = await (await fetch(`https://api.color.pizza/v1/${hex}`)).json()
		
		colorNames.update(colorNames => {
			colorNames[hex] = response.colors[0].name
			return colorNames
		})
		
		return $colorNames[hex]
	}

	function hslToHex(h: number, s: number, l: number): string {
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

<Draggable {draggable} broadcast={{ token: { color: color, value: value, id: id }}}>
	<div class="
	 bg-white flex flex-col items-center p-2 sm:p-4 sm:max-w-[67px] m-1 font-black text-4xl rounded-xl select-none shadow-md
	{draggable ? 'hover:scale-105 cursor-pointer' : ''} transition-all"
	style='color: {htmlColor}'
	on:mouseenter={() => timeout = setTimeout(() => hovering = true, 500)}
	on:mouseleave={() => { clearTimeout(timeout); hovering = false}}
	>
	<span class='text-center w-full'>
		{#if value === -1}
			*
		{:else}
			{value}
		{/if}
	</span>
		{#if hovering}
		<div class='position: absolute text-base -top-10 bg-black/50 rounded px-2 font-thin text-white text-center pointer-events-none' 
		in:fly={{y: -20, duration: 300}}
		>
		<!-- in:recieve={{key: id}}
		out:send={{key: id}} -->
			{#await getColorName(angle, 30, 50)}
				Loading...
			{:then name} 
				{name}
			{/await}
		</div>
		{/if}
		<!-- Circle --> 
		<div class="w-[35px] h-[35px] rounded-full" style='box-shadow: inset 0 0 4px hsla(0, 0%, 0%, 0.15);'/>
	</div>
</Draggable>