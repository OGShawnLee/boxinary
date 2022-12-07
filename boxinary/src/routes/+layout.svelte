<script lang="ts">
	import "virtual:windi.css";
	import type { LayoutData } from "./$types";
	import { currentUser } from "@root/state";

	export let data: LayoutData;

	currentUser.set(data.user);
</script>

<slot />
