<script lang="ts">
	import "virtual:windi.css";
	import type { LayoutData } from "./$types";
	import { NavBar } from "$lib/layout";
	import { currentUser } from "@root/state";

	export let data: LayoutData;

	currentUser.set(data.user);
</script>

<NavBar currentUser={data.user} />

<div class="w-full max-w-6xl mx-auto mt-6 mb-12 | <lg:(px-4 mt-24)">
	<slot />
</div>
