import { TextCollector } from '@forgerock/davinci-client/types';

export default function usernameComponent(
  formEl: HTMLFormElement,
  collector: TextCollector,
  updater: (value: string, index?: number) => void | { message: string },
) {
  const collectorKey = collector.output.key;
  const label = document.createElement('label');
  const input = document.createElement('input');

  label.htmlFor = collectorKey;
  label.innerText = collector.output.label;
  input.type = 'text';
  input.id = collectorKey;
  input.name = collectorKey;

  formEl?.appendChild(label);
  formEl?.appendChild(input);

  formEl?.querySelector(`#${collectorKey}`)?.addEventListener('input', (event) => {
    const error = updater((event.target as HTMLInputElement).value);
    if (error) {
      console.error(error.message);
    }
  });
}
