import { ActionCollector } from '@forgerock/davinci-client/types';

export default function submitButtonComponent(formEl: HTMLFormElement, collector: ActionCollector) {
  const button = document.createElement('button');

  button.type = 'submit';
  button.innerText = collector.output.label;

  formEl?.appendChild(button);
}
