import {writable} from 'svelte/store';

export const email = writable<string | null | false>(null);
