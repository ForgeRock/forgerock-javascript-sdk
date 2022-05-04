<script>
  export let callback;
  export let inputName;

  const existingValue = callback?.getInputValue();
  const textInputLabel = callback.getPrompt();
  const stringAttributeName = callback.getName && callback.getName();

  function setValue(event) {
    console.log(event.target.value);
    callback.setInputValue(event.target.value);
  }
</script>

<div>
  <label class="flex pt-4 w-full" for={inputName}>
    {textInputLabel}
  </label>
  <input
    class="rounded w-full"
    id={inputName}
    on:change={setValue}
    type={stringAttributeName == 'mail' ? 'email' : 'text'}
    value={existingValue}
  />
</div>
