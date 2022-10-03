<script lang="ts">
	import { InputGroup } from "$lib/components";

	export let form: ValidationForm<"name" | "displayName" | "email" | "password">;
</script>

<svelte:head>
	<title>Sign Up / Boxinary</title>
</svelte:head>

<main class="w-full max-w-md | grid gap-12 | lg:(max-w-4xl grid-cols-12)">
	<!-- Form - Right -->
	<div class="grid gap-7.5 | w-full | md:col-span-6 lg:(order-2)">
		<div class="grid gap-12">
			<div class="flex items-center gap-1.5 | md:hidden">
				<span class="text-3xl text-white font-medium font-poppins"> Boxinary </span>
			</div>
			<header>
				<h1 class="text-2xl text-white font-medium font-bold">Sign Up</h1>
				<p class="text-sm">
					Already have an account?
					<a class="text-aqua-50 hover:underline" href="/auth/sign-in"> Sign In! </a>
				</p>
			</header>
		</div>
		<form class="grid gap-6" method="post">
			<div class="grid gap-4.5">
				<InputGroup
					id="name"
					icon="bx-user-circle"
					charLimit={50}
					placeholder="John Doe"
					error={form?.name}
				/>
				<InputGroup
					id="display-name"
					label="username"
					icon="bx-at"
					charLimit={16}
					error={form?.displayName}
					placeholder="OGJohnDoe"
				/>
				<InputGroup
					id="email"
					icon="bx-envelope"
					charLimit={254}
					error={form?.email}
					let:input
					let:bind
				>
					<input type="email" {...input} placeholder="OGJohnDoe@example" use:bind />
				</InputGroup>
				<InputGroup
					id="password"
					icon="bx-lock"
					charLimit={80}
					error={form?.password}
					let:input
					let:bind
				>
					<input type="password" {...input} use:bind />
				</InputGroup>
			</div>
			<button class="button button--aqua" type="submit"> Sign Up </button>
		</form>
	</div>
	<!-- Banner - Left -->
	<div
		class="p-8 | flex flex-col justify-between gap-9 rounded-xl overflow-hidden md:col-span-6 lg:order-1"
		data-element="banner-left"
	>
		<div class="grid gap-9">
			<span class="text-xl text-white font-medium font-poppins md:text-2xl"> Boxinary </span>
			<span class="uppercase text-3xl text-white font-bold">
				Join a <b class="text-aqua-50">community</b>
				of learners from all over the world and start building your
				<b class="text-aqua-50"> dictionary! </b>
			</span>
		</div>
		<div class="flex items-center gap-1.5 | not-sr-only" aria-hidden>
			<a
				href="https://www.artstation.com/artwork/q8E2D"
				target="_blank"
				title="View Original Image"
			>
				<i class="bx bx-palette | text-xl hover:text-white" />
				<span class="sr-only">View Original Image</span>
			</a>
			<a
				class="text-sm hover:text-aqua-50"
				href="https://www.artstation.com/mchahin"
				target="_blank"
				title="View Image Author"
			>
				Mohamed Chahin
			</a>
		</div>
	</div>
</main>

<style>
	div[data-element="banner-left"] {
		position: relative;
	}

	div[data-element="banner-left"]::after {
		content: "";
		position: absolute;
		inset: 0;
		background: bottom
			url("https://i.pinimg.com/564x/93/c1/38/93c138ea7652793cee7e3c4c63dd6007.jpg");
		background-size: cover;
		opacity: 0.25;
		z-index: -10;
	}
</style>
