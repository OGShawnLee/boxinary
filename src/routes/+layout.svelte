<script>
	import "virtual:windi.css";
	import { ListItemLink } from "$lib/components";
</script>

<svelte:head>
	<title>Boxinary</title>
</svelte:head>

<header
	class="fixed top-0 inset-x-0 h-24 | flex items-center | bg-raisin-10/85 backdrop-filter backdrop-blur-sm | lg:static"
>
	<div class="w-full max-w-6xl mx-auto px-4 | flex items-center justify-between | lg:px-0">
		<div class="flex items-center gap-24">
			<a href="/">
				<span class="font-bold text-4xl text-white"> Boxinary </span>
			</a>
			<nav class="hidden | lg:block">
				<ul class="flex items-center gap-12 | font-medium">
					<ListItemLink class="hover:text-white" href="/home" text="Home" />
					<ListItemLink class="hover:text-white" href="/documentation" text="Documentation" />
					<ListItemLink class="hover:text-white" href="/community" text="Community" />
					<ListItemLink class="hover:text-white" href="/dictionary" text="Dictionary" />
				</ul>
			</nav>
		</div>
		<div class="hidden | lg:(flex gap-3)">
			<a
				class="min-h-10 px-6 | grid place-content-center | border-2 border-aqua-50 rounded-xl font-bold text-white"
				href="/auth/sign-up"
			>
				Sign Up
			</a>
			<a
				class="min-h-10 px-6 | grid place-content-center | border-2 border-raisin-20 rounded-xl text-rich-90 font-medium"
				href="/auth/sign-in"
			>
				Sign In
			</a>
		</div>
	</div>
</header>

<div class="w-full max-w-6xl mx-auto my-12 | <lg:(px-4 mt-32)">
	<slot />
</div>
