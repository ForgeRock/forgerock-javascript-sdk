import { SingleValueCollector } from '@forgerock/davinci-client/types';

export default function usernameComponent(
  formEl: HTMLFormElement,
  collector: SingleValueCollector,
  updater: (value: string, index?: number) => void,
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
    updater((event.target as HTMLInputElement).value);
  });
}
