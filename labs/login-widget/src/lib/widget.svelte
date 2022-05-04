<script>
  import { Config } from '@forgerock/javascript-sdk';

  import Form from './components/journey/form.svelte';
  import KeyIcon from './components/icons/key-icon.svelte';
  import { isModalOpen, closeModal } from './widget.store';

  export let config;
  export let authCallback;

  Config.set(config);
</script>

<div
  class={$isModalOpen ?
    'absolute top-2 left-2/4 w-[500px] -translate-x-2/4 my-5 min-h-full' :
    'hidden'}>
  <div class="max-w-lg w-full bg-white p-10 rounded shadow-md">
    <div class="flex w-full justify-center">
      <KeyIcon classes="text-gray-400 fill-current" size="72px" />
    </div>
    <h1 class="flex justify-center text-4xl text-gray-600 font-family-">Sign In</h1>
    <Form {closeModal} {authCallback} />
  </div>
</div>