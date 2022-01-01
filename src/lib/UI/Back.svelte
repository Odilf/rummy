<script lang="ts">
	export let floating: boolean = false
</script>

{#if floating}
	<div class='absolute top-0 left-0'>
		<button class='sticky top-2 left-0 z-50 bg-secondary p-2 m-2'> Back </button>
	</div>
{:else}
	<button> Back </button>
{/if}