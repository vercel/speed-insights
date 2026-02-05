// @ts-expect-error typescript doesn't handle ./index.astro properly, but it's needed to generate types
// biome-ignore lint/complexity/noUselessRename: Exporting everything doesn't yield the desired outcome
export { default as default } from './index.astro';
