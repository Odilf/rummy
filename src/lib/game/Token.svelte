<script lang="ts">
	import Draggable from '$lib/draggable/Draggable.svelte'

	export let color: number
	export let value: number
	export let id: number = null

	export let draggable = true

	function getColor(index: number) {
		const angle = (index % 4)*360/4 + 90*(1 - 1/(2**Math.floor(index/4)))
		return `hsla(${angle}, 30%, 50%)`
	}

</script>

<Draggable {draggable} broadcast={{ token: { color: color, value: value, id: id }}}>
	<div class="
	token bg-white flex flex-col items-center p-4 m-1 font-black text-4xl rounded-xl select-none shadow-xl
	{draggable ? 'hover:scale-105 cursor-pointer' : ''} transition-all
	"
	style='--color: {getColor(color)}'
	>
		{value}
		<div class="w-[35px] h-[35px] rounded-full" style='box-shadow: inset 0 0 4px hsla(0, 0%, 0%, 0.15);'/>
	</div>
</Draggable>

<style>
	.token {
		color: var(--color)
	}
</style>