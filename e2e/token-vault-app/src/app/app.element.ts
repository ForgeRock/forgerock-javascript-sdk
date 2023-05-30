import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'token-vault-app';
    this.innerHTML = `
  
    `;
  }
}
customElements.define('forgerock-root', AppElement);
