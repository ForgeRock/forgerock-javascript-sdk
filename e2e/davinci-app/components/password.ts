import { PasswordCollector } from '@forgerock/davinci-client/types';

export default function passwordComponent(
  formEl: HTMLFormElement,
  collector: PasswordCollector,
  updater: (value: string, index?: number) => void | { message: string },
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
    if (error) {
      console.error(error.message);
    }
  });
}
