import { FlowCollector } from '@forgerock/davinci-client/types';

export default function flowLinkComponent(
  formEl: HTMLFormElement,
  collector: FlowCollector,
  flow: (action: string) => void | { message: string },
  renderForm: () => void,
) {
  const button = document.createElement('button');

  button.classList.add('flow-link');
  button.type = 'button';
  button.innerText = collector.output.label;

  formEl?.appendChild(button);

  button.addEventListener('click', async () => {
    const error = await flow(collector.output.key);
    if (error) {
      console.error(error.message);
    }
    renderForm();
  });
}
