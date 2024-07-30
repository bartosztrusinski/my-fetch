import { myFetch } from './myFetch';

const url = new URL('https://jsonplaceholder.typicode.com/posts');

myFetch(url).then((response) => {
  console.log(response);
});
