<script>
	import "virtual:windi.css";
</script>

<header
	class="fixed top-0 inset-x-0 z-90 h-16 | flex items-center | bg-raisin-10/85 backdrop-filter backdrop-blur-sm | md:h-24 lg:static"
>
	<div class="w-full mx-auto px-4 | flex items-center justify-between | layout-length | lg:px-0">
		<div class="flex items-center gap-12">
			<a class="text-2xl text-white font-semibold font-poppins md:text-4xl" href="/"> Boxinary </a>
		</div>
	</div>
</header>

<div class="w-full mx-auto mt-16 mb-12 px-4 | layout-length | md:(mt-24) lg:(mt-6 px-0)">
	<slot />
</div>
