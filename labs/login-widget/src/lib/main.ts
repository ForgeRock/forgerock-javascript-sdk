import { FRUser } from '@forgerock/javascript-sdk';
import LoginWidget from './widget.svelte';
import { openModal } from './widget.store';

export default LoginWidget;

export const open = openModal;
export const User = FRUser;
