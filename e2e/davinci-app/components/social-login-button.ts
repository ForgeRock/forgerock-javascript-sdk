import { SocialLoginCollector } from '@forgerock/davinci-client/types';

export default function submitButtonComponent(
  formEl: HTMLFormElement,
  collector: SocialLoginCollector,
) {
  const link = document.createElement('a');

  link.innerText = collector.output.label;
  link.href = collector.output?.url || '';

  formEl?.appendChild(link);
}
