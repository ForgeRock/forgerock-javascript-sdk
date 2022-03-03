import Page from './Page.svelte';

export default {
  title: 'Example/Page',
  component: Page,
  argTypes: {
    onLogin: { action: 'onLogin' },
    onLogout: { action: 'onLogout' },
    onCreateAccount: { action: 'onCreateAccount' },
  },
};

const Template = (args) => ({
  Component: Page,
  props: args,
  on: {
    login: args.onLogin,
    logout: args.onLogout,
    createAccount: args.onCreateAccount,
  },
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
