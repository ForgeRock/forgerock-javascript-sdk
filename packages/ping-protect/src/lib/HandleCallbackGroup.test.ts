import { describe, it, expect } from 'vitest';
import { CallbackType } from '@forgerock/javascript-sdk';
import { HandleCallbackGroup } from './HandleCallbackGroup';
import {
  standardPingProtectEvaluationStep,
  standardPingProtectInitializeStep,
} from './test/mock-data';

describe('Handle Callback Group Tests', () => {
  it('should handle the initialize callback & hidden value callback', () => {
    const metadataCb = HandleCallbackGroup.getMetadataCallback(standardPingProtectInitializeStep);
    expect(metadataCb).toEqual(
      standardPingProtectInitializeStep.getCallbackOfType(CallbackType.MetadataCallback),
    );

    const callbacks = HandleCallbackGroup.getCallbacks(standardPingProtectInitializeStep);

    expect(callbacks).toEqual({
      metadataCallback: standardPingProtectInitializeStep.getCallbackOfType(
        CallbackType.MetadataCallback,
      ),
      clientError: standardPingProtectInitializeStep.getCallbackOfType(
        CallbackType.HiddenValueCallback,
      ),
    });

    const { metadataCallback, clientError } = callbacks;

    expect(metadataCallback.getData()).toEqual({
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
    });

    clientError.setInputValue('the error');
    expect(clientError.getInputValue()).toEqual('the error');
  });

  it('should handle the evaluation callbacks', () => {
    const metadataCb = HandleCallbackGroup.getMetadataCallback(standardPingProtectEvaluationStep);

    expect(metadataCb).toEqual(
      standardPingProtectEvaluationStep.getCallbackOfType(CallbackType.MetadataCallback),
    );

    const callbacks = HandleCallbackGroup.getCallbacks(standardPingProtectEvaluationStep);

    expect(callbacks).toEqual({
      metadataCallback: standardPingProtectEvaluationStep.getCallbackOfType(
        CallbackType.MetadataCallback,
      ),
      input: standardPingProtectEvaluationStep.getCallbacksOfType(
        CallbackType.HiddenValueCallback,
      )[0],
      clientError: standardPingProtectEvaluationStep.getCallbacksOfType(
        CallbackType.HiddenValueCallback,
      )[1],
    });

    const { metadataCallback, clientError, input } = callbacks;

    expect(metadataCallback.getData()).toEqual({
      _type: 'PingOneProtect',
      _action: 'protect_risk_evaluation',
      envId: 'some_id',
      pauseBehavioralData: true,
    });

    input?.setInputValue('saved input');
    expect(input?.getInputValue()).toEqual('saved input');
    clientError.setInputValue('the error');
    expect(clientError.getInputValue()).toEqual('the error');
  });
});
