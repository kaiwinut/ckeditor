<script lang="ts">
	import { CKEditor } from '$lib/components/ckeditor';
	import '@ckeditor/ckeditor5-build-classic/build/translations/ja.js';

	const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'heading',
				'|',
				'bold',
				'italic',
				'|',
				'link',
				'insertImage',
				'insertTable',
				'mediaEmbed',
				'blockQuote',
				'|',
				'bulletedList',
				'numberedList',
				'outdent',
				'indent'
			]
		},
		language: 'ja'
	};

	let value = '<i>Default value</i>';
	let value2 = '';
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-blue-100">
	<div class="container grid grid-cols-2 gap-8 bg-orange-200">
		<p>{value}</p>
		<div class="ck-content bg-white" style="--ck-todo-list-checkmark-size: 12px;">
			<CKEditor id="_editor" bind:value config={editorConfig} />
		</div>
	</div>
	<div class="container grid grid-cols-2 gap-8 bg-orange-200">
		<p>{value2}</p>
		<div class="ck-content bg-white" style="--ck-todo-list-checkmark-size: 12px;">
			<CKEditor id="_editor2" bind:value={value2} config={editorConfig} />
		</div>
	</div>
</main>
