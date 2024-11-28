import { TextCollector } from '@forgerock/davinci-client/types';

export default function (
  formEl: HTMLFormElement,
  collector: TextCollector,
  updater: (value: string, index?: number) => void | { message: string },
) {
  // create paragraph element with text of "Loading ... "
  const p = document.createElement('p');

  p.innerText = collector.output.label;
  formEl?.appendChild(p);

  const error = updater('fakeprofile');
  if (error) {
    console.error(error.message);
  }
}
