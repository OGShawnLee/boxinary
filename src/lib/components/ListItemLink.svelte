<script lang="ts">
	let className: string | undefined = undefined;

	export let href: string;
	export let text: string;
	export { className as class };
</script>

<li>
	<a class={className} {href} data-sveltekit-preload-data>{text}</a>
</li>
