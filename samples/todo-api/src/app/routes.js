/*
 * forgerock-sample-web-react
 *
 * server.routes.mjs
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import * as db from './db.js';
import { auth } from './middleware.js';

/**
 * @function routes - Initializes the routes
 * @param app {Object} - Express application
 * @return {void}
 */
export default async function routes(app) {
  /**
   * Protected route for initializing a new user.
   * The auth middleware checks for valid user auth.
   */
  app.post('/users', auth, async (req, res) => {
    await db.initUser(req.user);
    res.status(204).send();
  });

  /**
   * Protected route for todos.
   * The auth middleware checks for valid user auth.
   */
  app.get('/todos', auth, async (req, res) => {
    const todos = await db.getAll(req.user);
    res.json(todos);
  });

  app.post('/todos', auth, async (req, res) => {
    const newTodo = {
      title: req.body.title,
      completed: false,
      _id: Date.now().toString(),
    };

    await db.put(req.user, newTodo, true);
    const todo = await db.get(req.user, newTodo._id);

    res.json(todo);
  });

  app.post('/todos/:id', auth, async (req, res) => {
    const ref = await db.get(req.user, req.params.id);

    const completed = typeof req.body.completed === 'boolean' ? req.body.completed : ref.completed;

    await db.put(req.user, {
      _id: ref._id,
      _rev: ref._rev,
      completed: completed,
      owner: req.user.user_id,
      title: req.body.title || ref.title,
    });
    const todo = await db.get(req.user, ref._id);

    res.json(todo);
  });

  app.delete('/todos/:id', auth, async (req, res) => {
    const todo = await db.get(req.user, req.params.id);
    todo._deleted = true;
    await db.put(req.user, todo);

    res.status(204).send('OK');
  });

  app.get('/healthcheck', (_, res) => {
    res.status(200).send('Ok');
  });
}
