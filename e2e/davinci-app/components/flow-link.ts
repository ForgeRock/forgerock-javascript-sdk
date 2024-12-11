import { FlowCollector, InitFlow } from '@forgerock/davinci-client/types';

export default function flowLinkComponent(
  formEl: HTMLFormElement,
  collector: FlowCollector,
  flow: InitFlow,
  renderForm: () => void,
) {
  const button = document.createElement('button');

  button.classList.add('flow-link');
  button.type = 'button';
  button.innerText = collector.output.label;

  formEl?.appendChild(button);

  button.addEventListener('click', async () => {
    const node = await flow();
    if (node.error) {
      console.error(node.error.message);
    }
    renderForm();
  });
}
