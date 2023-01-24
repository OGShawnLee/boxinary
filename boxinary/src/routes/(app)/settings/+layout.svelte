<script lang="ts">
	import { Header, SettingsLink } from "$lib/components";
	import { Navigable } from "@boxinary/ui";
</script>

<div class="grid lg:grid-cols-12 gap-12">
	<div class="col-span-6 | flex flex-col gap-9">
		<Header big>
			<span class="text-white"> Settings </span>
		</Header>
		<Navigable class="grid gap-3" vertical>
			<SettingsLink path="account" title="Account" icon="bx bx-user-circle">
				Check information of your account, download an archive of your data, or learn about account
				deactivation.
			</SettingsLink>
			<SettingsLink path="privacy" title="Privacy" icon="bx bx-lock">
				Customise the visibility of your account and data.
			</SettingsLink>
			<SettingsLink path="profile" title="Profile" icon="bx bx-at">
				Update your public information like your name, username and description.
			</SettingsLink>
		</Navigable>
	</div>
	<div class="col-span-6">
		<slot />
	</div>
</div>
