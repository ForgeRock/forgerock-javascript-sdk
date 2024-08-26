import { CallbackType, FRStep } from '@forgerock/javascript-sdk';

export const standardPingProtectInitializeStep = new FRStep({
  authId: 'foo',
  callbacks: [
    {
      type: 'MetadataCallback' as CallbackType.MetadataCallback,
      output: [
        {
          name: 'data',
          value: {
            _type: 'PingOneProtect',
            _action: 'protect_initialize',
            envId: 'some_id',
            consoleLogEnabled: true,
            deviceAttributesToIgnore: [],
            customHost: '',
            lazyMetadata: true,
            behavioralDataCollection: true,
            disableHub: true,
            deviceKeyRsyncIntervals: 10,
            enableTrust: true,
            disableTags: true,
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback' as CallbackType.HiddenValueCallback,
      output: [
        {
          name: 'value',
          value: '',
        },
        {
          name: 'id',
          value: 'clientError',
        },
      ],
      input: [
        {
          name: 'IDToken1',
          value: 'clientError',
        },
      ],
    },
  ],
});

export const standardPingProtectEvaluationStep = new FRStep({
  authId: 'foo',
  callbacks: [
    {
      type: 'MetadataCallback' as CallbackType.MetadataCallback,
      output: [
        {
          name: 'data',
          value: {
            _type: 'PingOneProtect',
            _action: 'protect_risk_evaluation',
            envId: 'some_id',
            pauseBehavioralData: true,
          },
        },
      ],
    },
    {
      type: 'HiddenValueCallback' as CallbackType.HiddenValueCallback,
      output: [
        {
          name: 'value',
          value: '',
        },
        {
          name: 'id',
          value: 'pingone_risk_evaluation_signals',
        },
      ],
      input: [
        {
          name: 'IDToken1',
          value: 'pingone_risk_evaluation_signals',
        },
      ],
    },
    {
      type: 'HiddenValueCallback' as CallbackType.HiddenValueCallback,
      output: [
        {
          name: 'value',
          value: '',
        },
        {
          name: 'id',
          value: 'clientError',
        },
      ],
      input: [
        {
          name: 'IDToken1',
          value: 'clientError',
        },
      ],
    },
  ],
});
