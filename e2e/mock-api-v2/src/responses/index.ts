import { Array } from 'effect';
import { UsernamePassword } from './username-password';
import { PingProtectNode } from './custom-html-template/ping-protect-node';
import { InvalidUsernamePassword } from './invalid-username-password';

type ResponseMapKeys = keyof typeof responseMap;
const responseMap = {
  UsernamePassword: Array.make(PingProtectNode, UsernamePassword),
} as const;

type ErrorMapKeys = keyof typeof errorMap;
const errorMap = {
  InvalidUsernamePassword,
} as const;

export { ResponseMapKeys, responseMap, errorMap, ErrorMapKeys };
