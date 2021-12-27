import { writable } from "svelte/store";

export let colorNames = writable({
	"80a659": "Springview Green",
	"59a6a6": "Paradise Island",
	"8059a6": "Highlighter Lavender",
	"a65959": "Cheek Red"
})

colorNames.subscribe(console.log)