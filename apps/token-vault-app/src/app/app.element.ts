import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'token-vault-app';
    this.innerHTML = `
      <button id="loginBtn">Login</button>
    <button id="fetchMockBtn">Fetch Mock Todos</button>
    <button id="fetchUserBtn">Fetch Real User</button>
    <button id="logoutBtn">Logout</button>
    `;
  }
}
customElements.define('forgerock-root', AppElement);
