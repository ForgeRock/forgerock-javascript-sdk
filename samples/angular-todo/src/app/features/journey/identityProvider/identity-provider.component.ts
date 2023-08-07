import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import SelectIdPCallback, {
  IdPValue,
} from 'packages/javascript-sdk/src/fr-auth/callbacks/select-idp-callback';
import { IdpNames } from '../../../shared/idps.types';

@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
})
export class IdentityProviderComponent implements OnInit {
  /**
   * The callback to be represented as select input
   */
  @Input() callback?: SelectIdPCallback;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  @Output() updatedCallback = new EventEmitter<string>();

  identityProviders: IdPValue[];

  getDisplayName(idp: IdPValue): IdpNames {
    switch (idp.uiConfig.buttonDisplayName) {
      case 'Google':
        return 'Google';
      case 'Facebook':
        return 'Facebook';
      case 'Apple':
        return 'Apple';
      default:
        return 'Google';
    }
  }
  ngOnInit(): void {
    this.identityProviders = this.callback
      .getProviders()
      .filter((provider) => provider.provider !== 'localAuthentication');
  }

  onSetProvider(provider: string): void {
    this.updatedCallback.emit(provider);
  }
}
