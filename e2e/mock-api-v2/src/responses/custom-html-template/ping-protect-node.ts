const PingProtectNode = {
  interactionId: '1894775c-ba76-4989-a303-320f0547c66e',
  connectorId: 'api',
  interactionToken:
    '7d242c81eabd4987b902448b3d92a5ed3d7c07ccddc681b5b3b3cbcde624e5466b560d2f47ac63605a45057a823144c55a8b5ebe70ac9cbab00921c0efcd1b707738ab5593d8e2cad20c9c4ba3834e15bb7eed4ca29673b2fa24192c7916bdc28b13d0414c1e421c6f7d197c1bafef00fa8ab725ee9ede76abbc068afa3b8605',
  success: true,
  startUiSubFlow: true,
  _links: {
    next: {
      href: 'https://auth.pingone.ca/02fb4743-189a-4bc7-9d6c-a919edfe6447/davinci/connections/867ed4363b2bc21c860085ad2baa817d/capabilities/customHTMLTemplate',
    },
  },
  eventName: 'continue',
  isResponseCompatibleWithMobileAndWebSdks: true,
  id: 'tavl3e1h2q',
  companyId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
  flowId: 'f17221dd5a67fef0382db1e77791d436',
  connectionId: '867ed4363b2bc21c860085ad2baa817d',
  capabilityName: 'customHTMLTemplate',
  formData: {
    value: {
      protectsdk: '',
    },
  },
  form: {
    name: 'Start Node',
    description: '',
    category: 'CUSTOM_HTML',
    components: {
      fields: [
        {
          type: 'TEXT',
          key: 'protectsdk',
          label: 'Protect Payload',
        },
      ],
    },
  },
};

export { PingProtectNode };
