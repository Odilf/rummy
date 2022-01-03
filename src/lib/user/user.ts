import GUN from 'gun'
import { writable } from 'svelte/store'

export const gun = GUN(['http://localhost:8765/gun', 'https://odilf-rummy.herokuapp.com/gun'])