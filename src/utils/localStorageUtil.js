export const save = (key,value)=> window.localStorage.setItem(key,JSON.stringify(value));
export const load = (key) => JSON.parse(window.localStorage.getItem(key));
export const has = (key) => window.localStorage.getItem(key);