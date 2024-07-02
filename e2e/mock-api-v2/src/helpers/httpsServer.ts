//import * as fs from 'fs';
//import { HttpApp, HttpServer } from '@effect/platform';
//import { NodeContext, NodeHttpServer } from '@effect/platform-node';
//import { Effect, Layer, pipe } from 'effect';
//import { NodeServer, NodeSwaggerFiles } from 'effect-http-node';
//import { createServer } from 'https';
//import * as mkcert from 'mkcert';
//
//const generateCerts = Effect.tryPromise({
//  try: () =>
//    mkcert.createCA({
//      state: 'CO',
//      locality: 'US',
//      validity: 7200,
//      countryCode: 'US',
//      organization: 'Dev Org',
//    }),
//  catch: (err) => new Error(`failed to make cert, ${err}`),
//}).pipe(
//  Effect.tryMapPromise({
//    try: (ca) =>
//      mkcert.createCert({
//        ca,
//        validity: 7200,
//        organization: 'Dev Org',
//        email: 'testuser@example.com',
//        domains: ['localhost'],
//      }),
//    catch: () => new Error('failed to make cert'),
//  }),
//);
//
//const nodeServer = (options: Partial<NodeServer.Options>) =>
//  Layer.unwrapEffect(
//    Effect.gen(function* () {
//      const { cert, key } = yield* generateCerts;
//      return NodeHttpServer.layer(() => createServer({ cert, key }), {
//        ...options,
//      });
//    }),
//  );
//const httpsListen =
//  (options: NodeServer.Options) =>
//  <R, E>(router: HttpApp.Default<E, R>) =>
//    pipe(
//      HttpServer.logAddress,
//      Effect.flatMap(() => Layer.launch(HttpServer.serve(router))),
//      Effect.tap(Effect.logInfo('Running on http://localhost:9443!')),
//      Effect.tap(Effect.logInfo('Check out the docs on http://localhost:9443/docs')),
//      Effect.scoped,
//      Effect.provide(nodeServer(options)),
//      Effect.provide(NodeSwaggerFiles.SwaggerFilesLive),
//      Effect.provide(NodeContext.layer),
//    );
//
//export { httpsListen };
