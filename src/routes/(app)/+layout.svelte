<script lang="ts">
	import { NavBar } from "$lib/layout";
	import { currentUser } from "@root/state";
</script>

<NavBar currentUser={$currentUser} />

<div class="w-full max-w-6xl mx-auto mt-24 mb-12 px-4 lg:(mt-6 px-0)">
	<slot />
</div>
