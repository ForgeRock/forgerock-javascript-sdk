import { writeFile } from 'fs';

// Assume development
let targetPath =
  process.env.NODE_ENV === 'production'
    ? 'samples/angular-todo/src/environments/environment.prod.ts'
    : 'samples/angular-todo/src/environments/environment.ts';

const envConfigFile = `export const environment = {
   AM_URL: '${process.env.AM_URL}',
   REALM_PATH: '${process.env.REALM_PATH}',
   WEB_OAUTH_CLIENT: '${process.env.WEB_OAUTH_CLIENT}',
   JOURNEY_LOGIN: '${process.env.JOURNEY_LOGIN}',
   JOURNEY_REGISTER: '${process.env.JOURNEY_REGISTER}',
   API_URL: '${process.env.API_URL}',
   production: '${process.env.NODE_ENV}'
};
`;
console.log(`The file ${targetPath} will be written with the following content: \n`);
console.log(envConfigFile);
writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment file generated correctly at ${targetPath} \n`);
  }
});
