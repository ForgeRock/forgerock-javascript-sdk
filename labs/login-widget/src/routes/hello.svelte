<script>
  import { name } from './store';
  // export let name = "Justin";

  function changeName(event) {
    name.set('Dave');
  }
</script>

<button on:click={changeName}>Click me!</button>
<p>Hello, {$name}!</p>
