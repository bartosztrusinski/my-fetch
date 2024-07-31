import { myFetch } from './myFetch.js';

const url = new URL('https://jsonplaceholder.typicode.com/posts');

makeGetRequest();
makePostRequest();

async function makeGetRequest() {
  try {
    const response = await myFetch(`${url}/1`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.table(data);
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
}

async function makePostRequest() {
  try {
    const response = await myFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
    });

    const data = await response.json();

    console.table(data);
  } catch (error) {
    console.error(`Fetch error: ${error}`);
  }
}
