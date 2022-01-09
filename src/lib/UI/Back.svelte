<script lang="ts">
	export let floating: boolean = false
</script>

{#if floating}
	<button class='z-50 bg-tertiary p-2 m-2'> Back </button>
{:else}
	<button on:click={() => history.back()} class='sticky top-2 left-2 z-50 bg-secondary p-2 m-2 justify-self-start'> Back </button>
{/if}