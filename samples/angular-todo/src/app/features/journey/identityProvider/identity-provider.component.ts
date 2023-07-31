import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import SelectIdPCallback, {
  IdPValue,
} from 'packages/javascript-sdk/src/fr-auth/callbacks/select-idp-callback';

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

  ngOnInit(): void {
    this.identityProviders = this.callback
      .getProviders()
      .filter((provider) => provider.provider !== 'localAuthentication');
  }

  onSetProvider(provider: string): void {
    this.updatedCallback.emit(provider);
  }

  isGoogleIdP(idP: string): boolean {
    return idP === 'Google';
  }

  isAppleIdP(idP: string): boolean {
    return idP === 'Apple';
  }

  isFacebookIdP(idP: string): boolean {
    return idP === 'Facebook';
  }
}
