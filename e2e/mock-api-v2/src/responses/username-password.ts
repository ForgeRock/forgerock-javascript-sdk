/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

const UsernamePassword = {
  interactionId: '1857e57f-aaad-43a5-9054-259683ae6e36',
  interactionToken:
    'd3c182ce4838859dcee69d991cada2b0f7130fbcadbe46c885e3a2a696f9b233f651cbb42cd65a3f0e47b096a33b7525c09816dc35ea67daa3c50df15b7b4f5c6a8680621b9e25b030ec636e4cb1ba402a2d1381592fe03b18876f37b11e8172585ff14c39ab265a9a0d10b20c62c27d05ab8b2022944e95adb3c075f6f621c2',
  _links: {
    next: {
      href: 'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/davinci/connections/867ed4363b2bc21c860085ad2baa817d/capabilities/customHTMLTemplate',
    },
  },
  eventName: 'continue',
  isResponseCompatibleWithMobileAndWebSdks: true,
  id: 'cq77vwelou',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  flowId: 'f17221dd5a67fef0382db1e77791d436',
  connectionId: '867ed4363b2bc21c860085ad2baa817d',
  capabilityName: 'customHTMLTemplate',
  formData: {
    value: {
      username: '',
      password: '',
    },
  },
  form: {
    name: 'Username/Password Form',
    description: '',
    category: 'CUSTOM_HTML',
    components: {
      fields: [
        {
          type: 'TEXT',
          key: 'username',
          label: 'Username',
        },
        {
          type: 'PASSWORD',
          key: 'password',
          label: 'Password',
        },
        {
          type: 'SUBMIT_BUTTON',
          key: 'SIGNON',
          label: 'Sign On',
        },
        {
          type: 'FLOW_BUTTON',
          key: 'TROUBLE',
          label: 'Having trouble signing on?',
        },
        {
          type: 'FLOW_BUTTON',
          key: 'REGISTER',
          label: 'No account? Register now!',
        },
      ],
    },
  },
};

export { UsernamePassword };
