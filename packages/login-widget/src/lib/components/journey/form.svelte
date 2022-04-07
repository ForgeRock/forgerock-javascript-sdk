<script>
  import { FRAuth, TokenManager } from '@forgerock/javascript-sdk';
  import Password from './password.svelte';
  import Text from './text.svelte';

  let step;
  let submitForm = () => {};

  if (typeof window === 'object') {
    (async () => {
      step = await FRAuth.next();
      console.log(step);
    })();

    submitForm = async (event) => {
      step = await FRAuth.next(step);
      console.log(step);

      if (step.type === 'LoginSuccess') {
        const tokens = await TokenManager.getTokens();
        console.log(tokens);
      }
    };
  }
</script>

{#if !step}
  <p>Loading ...</p>
{:else if step.type === 'Step'}
  <form on:submit|preventDefault={submitForm}>
    {#each step?.callbacks as callback}
      {#if callback.getType() === 'NameCallback'}
        <Text {callback} inputName={callback?.payload?.input?.[0].name} />
      {/if}
      {#if callback.getType() === 'PasswordCallback'}
        <Password {callback} inputName={callback?.payload?.input?.[0].name} />
      {/if}
    {/each}
    <button
      class="flex bg-blue-600 justify-center my-5 p-2 rounded text-white w-full"
      type="submit">
        Submit
    </button>
  </form>
{:else if step.type === 'LoginSuccess'}
  <p>Login Success!</p>
{/if}
