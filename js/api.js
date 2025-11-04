export async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return await res.json();
}

export async function getTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  return await res.json();
}

export async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await res.json();
}

export async function getComments() {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments');
  return await res.json();
}
