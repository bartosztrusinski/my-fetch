import { myFetch } from './myFetch.js';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const url = new URL('https://jsonplaceholder.typicode.com/posts');

const getPostsForm = document.querySelector('#get-posts') as HTMLFormElement;
const createPostForm = document.querySelector(
  '#create-post'
) as HTMLFormElement;
const postsEl = document.querySelector('#posts') as HTMLElement;
const createdPostsEl = document.querySelector('#created-posts') as HTMLElement;

getPostsForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const post = await getPosts();

  if (!post) {
    postsEl.innerHTML = '<p>No post found!</p>';
    return;
  }

  postsEl.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
  `;
});

createPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(createPostForm);
  const createdPost = await createPost(formData);

  if (!createdPost) {
    createdPostsEl.innerHTML = '<p>Could not create a post!</p>';
    return;
  }

  createdPostsEl.innerHTML += `
    <h2>${createdPost.title}</h2>
    <p>${createdPost.body}</p>
  `;

  createPostForm.reset();
});

async function getPosts() {
  try {
    const response = await myFetch(`${url}/1`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: Post = await response.json();

    return data;
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
}

async function createPost(formData: FormData) {
  try {
    const title = formData.get('title');
    const body = formData.get('body');

    const response = await myFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ title, body }),
    });

    const data: Post = await response.json();

    return data;
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
}
