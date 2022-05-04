import { v4 as uuid } from 'uuid';

const amSessions = {};

export function set(cookie: string): string {
  console.log('Cookie being set:');
  console.log(cookie);
  const cookieUuid = uuid();
  amSessions[cookieUuid] = cookie;
  console.log('AM Sessions stored:');
  console.log(amSessions);
  return cookieUuid;
}

export function get(uuid: string): string {
  console.log('UUID being requested:');
  console.log(uuid);
  const cookie = amSessions[uuid] || '';
  return cookie;
}

export function remove(uuid: string): void {
  delete amSessions[uuid];
}
