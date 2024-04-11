<script>
	import '../app.pcss';
</script>

<slot />

<style lang="postcss">
	:global(html, body) {
		@apply overscroll-y-none;
	}
</style>
