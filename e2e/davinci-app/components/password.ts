import { PasswordCollector, Updater } from '@forgerock/davinci-client/types';

export default function passwordComponent(
  formEl: HTMLFormElement,
  collector: PasswordCollector,
  updater: Updater,
) {
  const label = document.createElement('label');
  const input = document.createElement('input');

  label.htmlFor = collector.output.key;
  label.innerText = collector.output.label;
  input.type = 'password';
  input.id = collector.output.key;
  input.name = collector.output.key;

  formEl?.appendChild(label);
  formEl?.appendChild(input);

  formEl?.querySelector(`#${collector.output.key}`)?.addEventListener('blur', (event: Event) => {
    const error = updater((event.target as HTMLInputElement).value);
    if (error && 'error' in error) {
      console.error(error.error.message);
    }
  });
}
