<script>
	import '../../../../styles/course.scss';
	import { goto } from '$app/navigation';
	import attachment from '$lib/images/attachment.svg';
	import code from '$lib/images/code.svg';
	import link from '$lib/images/link.svg';
	import list from '$lib/images/list.svg';
	import quote from '$lib/images/quote.svg';
	import SvelteMarkdown from 'svelte-markdown';
	import host from '$lib/stores/host';
	import token from '$lib/stores/token';
	import axios from 'axios';
	import { page } from '$app/stores';
	import Select from 'svelte-select';
	import Message from '../../../../common/Message.svelte';
    import Loader from '../../../../common/Loader.svelte';
	import { onMount } from 'svelte';

	export let course;

	let inputRef;
	let prototype
	let previewMode = false;
	let items = [];
	let message = false; 
	let currentActive = 1;
    let loading = false

    let pages = [
		{
			id: 1,
			title: 'New chapter',
			isAssignment: false,
			text: ''
		}
	];

	$: currentPage = pages.find((page) => page.id == currentActive);

    let symbolMapping = {
		bold: '****',
		italic: '**',
		cut: '~~~~',
		h1: '# ',
		h2: '## ',
		h3: '### ',
		code: '`` ```',
		link: '[]()',
		quote: '> ',
		list: '- '
	};

	let toolboxOptions = [
		{ text: 'B', class: 'bold', name: 'bold' },
		{ text: 'I', class: 'italic', name: 'italic' },
		{ text: 'S', class: 'cut', name: 'cut' },
		{ text: 'H1', class: '', name: 'h1' },
		{ text: 'H2', class: '', name: 'h2' },
		{ text: 'H3', class: '', name: 'h3' }
	];

	let toolboxSpecialOptions = [
		{ class: 'code', name: 'code' },
		{ class: 'link', name: 'link' },
		{ class: 'quote', name: 'quote' },
		{ class: 'list', name: 'list' },
		{ class: 'attachment', name: 'attachment' }
	];

	onMount(async () => {
		let prototypes = [];

		const response = await axios
			.get(`${$host}/v1/prototype`, {
				headers: {
					Authorization: `Bearer ${$token}`
				}
			})
			.then(function (response) {
                let data = response.data

				for (let prototypeData of data) {
					let prototype = {};
                    
					prototype.value = prototypeData.uuid;
					prototype.label = prototypeData.name;
                    prototypes.push(prototype)
				}

				items = prototypes;
			})
			.catch(function (error) {
				console.log(error);
			});
	});

	export function preview() {
		previewMode = !previewMode;
	}

	function deletePage() {
		if (pages.length > 1) {
			pages = pages.filter(function (el) {
				return el.id != currentActive;
			});

			pages = pages.map(function (page, idx) {
				return { ...page, id: idx + 1 };
			});
			if (currentActive == 1) {
				currentActive += 1;
			} else {
				currentActive -= 1;
			}
		}
	}

	function newPage() {
		let newPageId = pages.length + 1;
		pages = [...pages, { title: 'New chapter', id: newPageId, isAssignment: false, text: '' }];
		currentActive = newPageId;
	}

	function attachmentOpen() {}

	function clearInput() {
		currentPage.text = '';
	}

	function addMarkdown(name) {
		currentPage.text += symbolMapping[name];
	}

	async function save(event) {
		let dataContent;
        loading = true

		for (let page of pages) {
            if (page.title.length == 0) {
                return
            }
			if (!page.isAssignment) {
				dataContent = {
					lesson: {
						text: page.text
					}
				};
			} else {
				dataContent = {
					assignment: {
						description: page.text,
						prototype_uuid: prototype.value
					}
				};
			}

			let data = {
				title: page.title,
				type: page.isAssignment ? 'ASSIGNMENT' : 'LESSON',
				data: dataContent
			};

			await axios
				.post(`${$host}/v1/course/${course.id}/page`, data, {
					headers: {
						Authorization: `Bearer ${$token}`
					}
				})
				.then(
					(response) => {
						if (page.id == pages.length) {
                            loading = false
							message = true;
							setTimeout(() => {
								message = false;
								goto(`/course/${course.id}`);
							}, 1500);
						}
					},
					(error) => {
                        loading = false
						console.log(error);
					}
				);
		}
	}
</script>

{#if message}
	<Message text="Saved! Redirecting to course" />
{/if}

{#if loading}
    <Loader/>
{/if}

<div>
	<div class="editor-box">
		<ul class="chapters-list">
			{#each pages as page}
				<li class={page.id == currentActive ? 'active' : ''}>
					<a href="?page_id={page.id}&editor=true" on:click={() => (currentActive = page.id)}
						>{page.title}</a
					>
				</li>
			{/each}
			<li>
				<button on:click={newPage}>+ New chapter</button>
			</li>
		</ul>

		<div class="editor {previewMode ? 'hidden' : ''}">
			<div class="editor__chapter">
				<input bind:value={currentPage.title} minlength="3" maxlength="50" required/>
			</div>

			<div class="editor__assignment">
				<input
					type="checkbox"
					id="assignment"
					class="assignment_checkbox"
					name="assignment"
					bind:checked={currentPage.isAssignment}
				/>
				<label for="assignment">Assignment</label>
			</div>

			{#if currentPage.isAssignment}
				<div>
					<Select
						--item-color="#151516"
						--input-color="#151516"
						--placeholder-color="#737373"
						--item-hover-color="#151516"
                        --selected-item-color="#151516"
						placeholder="Select prototype"
						bind:value={prototype}
						{items}
					/>
				</div>
			{/if}

			<div class="editor__toolbox">
				<ul>
					{#each toolboxOptions as option}
						<li>
							<input
								class={option.class}
								type="button"
								value={option.text}
								on:click={() => addMarkdown(option.name)}
							/>
						</li>
					{/each}
				</ul>
				|
				<ul>
					{#each toolboxSpecialOptions as option}
						<li>
							<input
								class="option {option.class}"
								type="button"
								value=""
								on:click={() =>
									option.name === 'attachment' ? attachmentOpen() : addMarkdown(option.name)}
							/>
						</li>
					{/each}
				</ul>
			</div>

			<form on:submit|preventDefault={save}>
				<div class="editor__textfield">
					<textarea
						bind:this={inputRef}
						name="course-text"
						rows="10"
						cols="30"
						bind:value={currentPage.text}
					/>
				</div>
				<div class="editor__actions">
					<div class="editor__delete-chapter btn-container red-fill">
						<input type="button" on:click={deletePage} value="Delete chapter" />
					</div>
					<div class="editor__clear btn-container red-fill">
						<input type="button" on:click={clearInput} value="Clear text field" />
					</div>
					<div class="editor__save btn-container green-fill">
						<input type="submit" value="Save all" />
					</div>
				</div>
			</form>
		</div>

		<div class="course-preview {!previewMode ? 'hidden' : ''}">
			<div class="page-container">
				<h1 class="page-title">{currentPage.title}</h1>
				<SvelteMarkdown source={currentPage.text} />
			</div>
		</div>
	</div>
</div>
