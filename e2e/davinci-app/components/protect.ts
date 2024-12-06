import { TextCollector, Updater } from '@forgerock/davinci-client/types';

export default function (formEl: HTMLFormElement, collector: TextCollector, updater: Updater) {
  // create paragraph element with text of "Loading ... "
  const p = document.createElement('p');

  p.innerText = collector.output.label;
  formEl?.appendChild(p);

  const error = updater('fakeprofile');
  if (error && 'error' in error) {
    console.error(error.error.message);
  }
}
