<svelte:head>
	<title>Boxinary - UI</title>
</svelte:head>

<div class="grid grid-cols-12 gap-12 items-start">
	<div class="col-span-6 | grid gap-9">
		<div class="grid gap-3">
			<h2 class="text-5xl text-white font-bold">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, officiis?
			</h2>
			<p class="text-lg text-rich-90">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente dolore aspernatur tempore
				officia soluta rem incidunt nemo illo quas perferendis.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aut rem laboriosam voluptate
				provident. Voluptatibus, magni!
			</p>
		</div>
		<div class="flex gap-3">
			<button class="px-8 py-2 | bg-raisin-50 rounded-lg text-white font-medium">
				Lorem, ipsum dolor.
			</button>
			<button class="px-8 py-2 | bg-raisin-12 rounded-lg"> Lorem, ipsum dolor. </button>
		</div>
	</div>
	<div class="w-full h-108 col-span-6 p-8 | rounded-3xl overflow-hidden" id="hero-image" />
</div>

<style>
	#hero-image {
		background: url(https://i.pinimg.com/564x/d8/4b/b0/d84bb0c309769ca8b7835757ce11d3bc.jpg);
		background-size: cover;
		background-position: center;
	}
</style>
