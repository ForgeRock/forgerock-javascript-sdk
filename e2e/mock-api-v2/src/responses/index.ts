import { Array } from 'effect';
import { UsernamePassword } from './UsernamePassword';
import { PingProtectNode } from './customHtml/PingProtectNode';
import { InvalidUsernamePassword } from './InvalidUsernamePassword';

type ResponseMapKeys = keyof typeof responseMap;
const responseMap = {
  UsernamePassword: Array.make(PingProtectNode, UsernamePassword),
} as const;

type ErrorMapKeys = keyof typeof errorMap;
const errorMap = {
  InvalidUsernamePassword,
} as const;

export { ResponseMapKeys, responseMap, errorMap, ErrorMapKeys };
