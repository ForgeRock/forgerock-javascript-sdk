/*
 * forgerock-sample-web-react
 *
 * webAuthn.js '../ components/icons/finger-print-icon'
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { FRWebAuthn, WebAuthnStepType } from '@forgerock/javascript-sdk';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../global-state';
/**
 * @function WebAuthn - Footer React component
 * @returns {Object} - React component object
 */
export default function WebAuthn({ step, setSubmissionStep }) {
  const [contextState] = useContext(AppContext);
  const webAuthnStep = FRWebAuthn.getWebAuthnStepType(step);
  const [state, setState] = useState({
    message: '',
    header: '',
  });
  useEffect(() => {
    async function performWebAuthn() {
      try {
        if (webAuthnStep === WebAuthnStepType.Registration) {
          setState({
            header: 'Registering your device',
            message: 'Your device will be used to verify your identity',
          });
          await FRWebAuthn.register(step);
        } else {
          setState({
            header: 'Verifying your identity',
            message: 'Use your device to verify your identity',
          });
          await FRWebAuthn.authenticate(step);
        }
        setSubmissionStep(step);
      } catch (e) {
        setSubmissionStep(step);
      }
    }
    performWebAuthn();
  }, []);

  return (
    <p>
      <span className="d-flex justify-content-center my-2">
        <span className="cstm_loading-spinner spinner-border text-primary" role="status"></span>
      </span>
      <span className={`d-flex justify-content-center fw-bolder ${contextState.theme.textClass}`}>
        {state.header}
      </span>
      <span className={`d-flex justify-content-center p-3 fs-5 ${contextState.theme.textClass}`}>
        {state.message}
      </span>
    </p>
  );
}
