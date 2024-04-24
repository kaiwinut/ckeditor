<!-- https://ckeditor.com/ckeditor-5/online-builder/ -->
<!-- https://ckeditor.com/docs/ckeditor5/latest/examples/builds-custom/full-featured-editor.html -->

<script lang="ts">
	import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
	import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
	import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
	import '@ckeditor/ckeditor5-build-classic/build/translations/ja.js';
	import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
	import { Essentials } from '@ckeditor/ckeditor5-essentials';
	import { FontBackgroundColor, FontColor } from '@ckeditor/ckeditor5-font';
	import { Heading } from '@ckeditor/ckeditor5-heading';
	import {
		Image,
		ImageCaption,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		PictureEditing
	} from '@ckeditor/ckeditor5-image';
	import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
	import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
	import { List } from '@ckeditor/ckeditor5-list';
	import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
	import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
	import {
		Table,
		TableCaption,
		TableCellProperties,
		TableClipboard,
		TableColumnResize,
		TableProperties,
		TableSelection,
		TableToolbar,
		TableUtils
	} from '@ckeditor/ckeditor5-table';
	import { TextTransformation } from '@ckeditor/ckeditor5-typing';
	import { Undo } from '@ckeditor/ckeditor5-undo';
	import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';
	import { WordCount } from '@ckeditor/ckeditor5-word-count';
	import debounce from 'just-debounce-it';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let id: string;
	export let value: string = '';
	export let disabled: boolean = false;
	export let config: Record<string, any> = {};

	let instance: ClassicEditor | null = null;
	let lastEditorData: string = '';

	const INPUT_EVENT_DEBOUNCE_WAIT = 300;
	const dispatch = createEventDispatcher();

	const watchValue = (v: string) => {
		if (instance && v !== lastEditorData) {
			instance.setData(v);
		}
	};

	const setUpEditorEvents = () => {
		const emitInputEvent = (event: any) => {
			const data = (value = lastEditorData = instance!.getData());
			dispatch('input', { data, event, instance });
		};

		instance!.model.document.on('change:data', debounce(emitInputEvent, INPUT_EVENT_DEBOUNCE_WAIT));
		instance!.editing.view.document.on('focus', (event) => {
			dispatch('focus', { event, instance });
		});
		instance!.editing.view.document.on('blur', (event) => {
			dispatch('blur', { event, instance });
		});
	};

	onMount(() => {
		ClassicEditor.create(document.getElementById(id)!, {
			...config,
			plugins: [
				Autoformat,
				AutoLink,
				Base64UploadAdapter,
				BlockQuote,
				Bold,
				Essentials,
				FontBackgroundColor,
				FontColor,
				Heading,
				Image,
				ImageCaption,
				ImageResize,
				ImageStyle,
				ImageToolbar,
				ImageUpload,
				Indent,
				IndentBlock,
				Italic,
				Link,
				LinkImage,
				List,
				PasteFromOffice,
				Paragraph,
				PictureEditing,
				Table,
				TableCaption,
				TableCellProperties,
				TableClipboard,
				TableColumnResize,
				TableProperties,
				TableSelection,
				TableToolbar,
				TableUtils,
				TextTransformation,
				Undo,
				WordCount
			],
			toolbar: {
				items: [
					'heading',
					'|',
					'bold',
					'italic',
					'link',
					'bulletedList',
					'numberedList',
					'|',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'outdent',
					'indent',
					'|',
					'imageUpload',
					'blockQuote',
					'insertTable',
					'|',
					'undo',
					'redo'
				]
			},
			image: {
				toolbar: [
					'imageStyle:block',
					'imageStyle:side',
					'|',
					'toggleImageCaption',
					'imageTextAlternative',
					'|',
					'linkImage'
				],
				insert: {
					type: 'auto'
				}
			},
			table: {
				contentToolbar: [
					'toggleTableCaption',
					'|',
					'tableColumn',
					'tableRow',
					'mergeTableCells',
					'|',
					'tableProperties',
					'tableCellProperties'
				]
			},
			language: 'ja',
			initialData: value
		})
			.then((editor) => {
				instance = editor;
				if (disabled) editor.enableReadOnlyMode(id);
				editor.ui
					.getEditableElement()
					?.parentElement?.insertBefore(
						editor.ui.view.toolbar.element!,
						editor.ui.getEditableElement()!
					);
				setUpEditorEvents();
			})
			.catch((error) => {
				console.error(error.stack);
			});
	});

	onDestroy(() => {
		if (instance) {
			instance.destroy();
			instance = null;
		}

		dispatch('destroy', instance);
	});

	$: watchValue(value);
</script>

<svelte:head>
	<script src="https://cdn.ckeditor.com/ckeditor5/41.3.1/classic/translations/ja.js"></script>
</svelte:head>

<div {id} />

<style lang="postcss">
	:global(.ck.ck-button) {
		@apply text-[9px];
	}
	:global(.ck.ck-balloon-panel.ck-powered-by-balloon) {
		@apply hidden;
	}
</style>
