import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import FRAuth from 'packages/javascript-sdk/src/fr-auth';
import SelectIdPCallback, {
  IdPValue,
} from 'packages/javascript-sdk/src/fr-auth/callbacks/select-idp-callback';

@Component({
  selector: 'app-identity-provider',
  templateUrl: './identity-provider.component.html',
  styleUrls: ['./identity-provider.component.css'],
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

  identityProviders: IdPValue[];

  ngOnInit(): void {
    this.identityProviders = this.callback
      .getProviders()
      .filter((provider) => provider.provider !== 'localAuthentication');
  }

  onSetProvider(provider: string): void {
    this.callback.setProvider(provider);
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
