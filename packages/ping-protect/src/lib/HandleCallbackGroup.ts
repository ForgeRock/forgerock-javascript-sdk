import {
  CallbackType,
  FRStep,
  HiddenValueCallback,
  MetadataCallback,
} from '@forgerock/javascript-sdk';

abstract class HandleCallbackGroup {
  static getMetadataCallback(step: FRStep) {
    const metadataCallback = step.getCallbackOfType<MetadataCallback>(
      CallbackType.MetadataCallback,
    );
    return metadataCallback;
  }

  //getOutcomeCallback(step: FRStep) {
  //  const hiddenValueCallbackArray = step.getCallbacksOfType<HiddenValueCallback>(
  //    CallbackType.HiddenValueCallback,
  //  );
  //
  //  hiddenValueCallbackArray.find(
  //    (callback) =>
  //      callback.getOutputByName<string>('id', '') === 'protect_initialize' ||
  //      callback.getOutputByName<string>('id', '') === 'protect_risk_evaluation',
  //  );
  //}

  static getCallbacks(step: FRStep) {
    const hiddenCallback = step.getCallbacksOfType<HiddenValueCallback>(
      CallbackType.HiddenValueCallback,
    );

    const metadataCallback = step.getCallbackOfType<MetadataCallback>(
      CallbackType.MetadataCallback,
    );

    const accumulated = hiddenCallback.reduce(
      (acc, curr) => {
        const output = curr.getOutputByName<string>('id', '');
        console.log('the output', output);
        if (output === 'clientError') {
          acc['clientError'] = curr;
        }
        if (output === 'pingone_risk_evaluation_signals') {
          acc['input'] = curr;
        }
        return acc;
      },
      {} as {
        clientError: HiddenValueCallback;
        input?: HiddenValueCallback;
      },
    );

    if (accumulated.input) {
      return {
        clientError: accumulated.clientError,
        metadataCallback,
        input: accumulated.input,
      };
    }
    return {
      clientError: accumulated.clientError,
      metadataCallback,
    };
  }
}

export { HandleCallbackGroup };
