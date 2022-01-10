import PouchDB from 'pouchdb';

const userDb = new PouchDB('users');
const todosDb = new PouchDB('todos');

// Private function for getting user data
async function getUser(id) {
  const user = await userDb.get(id);
  return user;
}

export async function initUser(user) {
  try {
    console.log(`Initialize user ${user.user_id}`);
    await userDb.put({
      _id: user.user_id,
      todos: [],
    });
  } catch (err) {
    console.log('Error initializing user');
    console.log(err);
  }
}

export async function getAll(user) {
  let userData;

  try {
    userData = await getUser(user.user_id);
  } catch (err) {
    console.log(`Error: retrieving user meta: ${err}`);
    console.log(`Attempting to initialize user: ${user.user_id}`);
    await initUser(user);
    userData = await getUser(user.user_id);
  }

  if (userData.todos.length) {
    const doc = await todosDb.bulkGet({
      docs: userData.todos,
    });

    const items = doc.results.map((result) => result.docs[0].ok);
    return items;
  } else {
    return [];
  }
}

export async function getSome(user, data) {
  const allDocs = await todosDb.allDocs();
  const filterDocs = allDocs.rows
    .filter((x) => data.includes(x.id))
    .map((x) => {
      return {
        id: x.id,
        rev: x.value.rev,
      };
    });

  const doc = await todosDb.bulkGet({
    docs: filterDocs,
  });

  const items = doc.results.map((result) => result.docs[0].ok);
  return items;
}

export async function updateSome(user, data) {
  await todosDb.bulkDocs(data);
  return null;
}

export async function get(user, id) {
  const userData = await userDb.get(user.user_id);
  const todo = userData.todos.find((todo) => todo.id === id);
  const item = await todosDb.get(todo.id);
  return item;
}

export async function put(user, data, create) {
  let item;
  try {
    item = await todosDb.put(data);
  } catch (err) {
    console.log(err);
  }
  const userData = await getUser(user.user_id);

  if (create) {
    userData.todos.unshift({ id: item.id, rev: item.rev });
  } else if (data._deleted) {
    userData.todos.forEach((todo, idx) => {
      if (todo.id === item.id) {
        userData.todos.splice(idx, 1);
      }
    });
  } else {
    userData.todos.forEach((todo) => {
      if (todo.id === item.id) {
        todo.rev = item.rev;
      }
    });
  }
  await userDb.put(userData);
  return item;
}
