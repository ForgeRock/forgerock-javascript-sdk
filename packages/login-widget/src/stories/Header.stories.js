import Header from './Header.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'Example/Header',
  component: Header,
  argTypes: {
    onLogin: { action: 'onLogin' },
    onLogout: { action: 'onLogout' },
    onCreateAccount: { action: 'onCreateAccount' },
  },
};

const Template = (args) => ({
  Component: Header,
  props: args,
  on: {
    login: args.onLogin,
    logout: args.onLogout,
    createAccount: args.onCreateAccount,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('heading'));
  },
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
