<script lang="ts">
	import { NavBar } from "$lib/layout";
	import { currentUser } from "@root/state";
</script>

<NavBar currentUser={$currentUser} />

<div class="w-full mx-auto mt-16 mb-12 px-4 | layout-length | md:(mt-24) lg:(mt-6 px-0)">
	<slot />
</div>
