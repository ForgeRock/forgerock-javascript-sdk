import { UsernamePassword } from './UsernamePassword';
import { PingProtectNode } from './customHtml/PingProtectNode';
import { InvalidUsernamePassword } from './InvalidUsernamePassword';
import { PingOneCustomHtmlResponseErrorBody } from '../schemas/customHtmlTemplate/responses';

type ResponseMapKeys = keyof typeof responseMap;
const responseMap = {
  UsernamePassword: [PingProtectNode, UsernamePassword] as const,
} as const;

type ErrorMapKeys = keyof typeof errorMap;
const errorMap = {
  InvalidUsernamePassword,
} as const;

export { ResponseMapKeys, responseMap, errorMap, ErrorMapKeys };
