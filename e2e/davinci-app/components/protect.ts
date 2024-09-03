import { SingleValueCollector } from '@forgerock/davinci-client/types';

export default function (
  formEl: HTMLFormElement,
  collector: SingleValueCollector,
  updater: (value: string, index?: number) => void,
) {
  // create paragraph element with text of "Loading ... "
  const p = document.createElement('p');

  p.innerText = collector.output.label;
  formEl?.appendChild(p);

  updater('fakeprofile');
}
