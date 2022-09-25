<script lang="ts">
	import "virtual:windi.css";
	import type { LayoutData } from "./$types";
	import { NavBar } from "$lib/layout";
	import { currentUser } from "@root/state";

	export let data: LayoutData;

	currentUser.set(data.user);
</script>

<NavBar currentUser={data.user} />

<div class="w-full max-w-6xl mx-auto mt-24 mb-12 px-4 lg:(mt-6 px-0)">
	<slot />
</div>
