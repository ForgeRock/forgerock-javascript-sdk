import { ActionCollector } from '@forgerock/davinci-client/types';

export default function flowLinkComponent(
  formEl: HTMLFormElement,
  collector: ActionCollector,
  flow: (action: string) => void,
  renderForm: (node: any) => void,
) {
  const button = document.createElement('button');

  button.classList.add('flow-link');
  button.type = 'button';
  button.innerText = collector.output.label;

  formEl?.appendChild(button);

  button.addEventListener('click', async () => {
    const node = await flow(collector.output.key);
    renderForm(node);
  });
}
