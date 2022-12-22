<script lang="ts">
	import { Disclosure, DisclosureButton, DisclosurePanel, Render } from "$lib/components";
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";

	let open = true;
	let count = 0;
	let element: HTMLElement;
	let value = "this is an input";
	onMount(() => console.log(element));

	let ref: HTMLElement;
	let invalidRef: HTMLElement;
	let internalRef: HTMLElement;
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<section>
	<h2>Render Playground</h2>
	<Render as="button" id="button" on:click={() => count++} bind:element>
		Click Me {count}
	</Render>
	{value}
	<input type="text" on:input={(e) => (value = e.currentTarget.value)} />
	<Render as="input" bind:value>
		<!-- wont be rendered and wont warn -->
		Click Me {count}
	</Render>
</section>

<section>
	<h2>Disclosure Playground {open}</h2>
	<button on:click={() => (open = !open)}> Toggle </button>
	<Disclosure let:isOpen let:button let:panel>
		<button id="action-button" use:button>
			<!-- id is respected by the action -->
			Toggle {isOpen}
		</button>
		<div slot="panel" let:close use:panel transition:slide>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur qui architecto rem!
			</p>
			<button on:click={close}> Close </button>
		</div>
	</Disclosure>
	<Disclosure bind:open>
		<DisclosureButton id="1-button" let:isOpen>
			<!-- id is invalid and automatically defaults to the library unique id -->
			Toggle {isOpen}
		</DisclosureButton>
		<DisclosurePanel id="    " let:close>
			<!-- id is invalid and automatically defaults to the library unique id -->
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur qui architecto rem!
			</p>
			<button on:click={close}> Close </button>
		</DisclosurePanel>
	</Disclosure>
	<Disclosure>
		<DisclosureButton id="dis-button" let:isOpen>
			<!-- id is respected and used in ssr -->
			Toggle {isOpen}
		</DisclosureButton>
		<DisclosurePanel id="dis-panel" on:mouseover={() => console.log("Yikes!")} let:close>
			<!-- id is respected and used in ssr -->
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur qui architecto rem!
			</p>
			<button on:click={close}> Close </button>
		</DisclosurePanel>
	</Disclosure>
	<section>
		<h3>Focus Playground</h3>
		<div>
			<button bind:this={ref}> Valid Target </button>
			<button bind:this={invalidRef} disabled> Invalid Target </button>
		</div>
		<Disclosure let:button let:panel let:close>
			<button use:button> Toggle </button>
			<div slot="panel" use:panel>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur magni fugit deserunt.
				</p>
				<button on:click={() => close(ref)}> Close & Focus Ref </button>
				<button on:click={() => close(invalidRef)}> Close & Focus Invalid Ref </button>
			</div>
		</Disclosure>
		<Disclosure>
			<DisclosureButton>Toggle</DisclosureButton>
			<DisclosurePanel let:close>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur magni fugit deserunt.
				</p>
				<button bind:this={internalRef}> Internal Ref </button>
				<button on:click={() => close(internalRef)}> Close & Focus Internal Ref </button>
			</DisclosurePanel>
		</Disclosure>
	</section>
</section>
