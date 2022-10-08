<script lang="ts">
	import type { ClientUser } from "@root/app";
	import type { Nullable } from "malachite-ui/types";
	import { ListItemLink } from "$lib/components";
	import { getDefinitionCreatePath, getProfilePath } from "$lib/utils";

	export let currentUser: Nullable<ClientUser> = undefined;
</script>

<header
	class="fixed top-0 inset-x-0 z-90 h-16 | flex items-center | bg-raisin-10/85 backdrop-filter backdrop-blur-sm | md:h-24 lg:static"
>
	<div class="w-full max-w-6xl mx-auto px-4 | flex items-center justify-between | lg:px-0">
		<div class="flex items-center gap-24">
			<a class="text-2xl text-white font-medium font-poppins md:text-4xl" href="/"> Boxinary </a>
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
			{#if currentUser}
				<div class="flex items-center gap-6">
					<div class="grid">
						<a href={getProfilePath(currentUser.displayName)}>
							<span class="text-sm text-white font-bold"> {currentUser.name} </span>
						</a>
						<span class="text-xs font-medium"> @{currentUser.displayName} </span>
					</div>
					<div class="flex items-center gap-3">
						<a
							class="button button--aqua grid-center"
							href={getDefinitionCreatePath(currentUser.displayName)}
						>
							New
						</a>
						<form method="post" action="/auth/sign-out">
							<button class="button button--raisin"> Sign Out </button>
						</form>
					</div>
				</div>
			{:else}
				<a class="button button--aqua grid-center" href="/auth/sign-up"> Sign Up </a>
				<a class="button button--raisin grid-center" href="/auth/sign-in"> Sign In </a>
			{/if}
		</div>
	</div>
</header>
