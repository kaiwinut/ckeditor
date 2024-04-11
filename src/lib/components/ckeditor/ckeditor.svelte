<script lang="ts">
	import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
		ClassicEditor.create(document.getElementById(id)!, { ...config, initialData: value })
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

<div {id} />

<style lang="postcss">
	:global(.ck.ck-button) {
		@apply text-xs;
	}
	:global(.ck.ck-balloon-panel.ck-powered-by-balloon) {
		@apply hidden;
	}
</style>
