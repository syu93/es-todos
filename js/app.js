import page from 'page';
import checkConnectivity from './network.js';
import { fetchTodos, createTodo } from './api/todo.js';
import { setTodos, setTodo, getTodos } from './idb.js';
// Loading config

checkConnectivity({});
document.addEventListener('connection-changed', e => {
  let root = document.documentElement;
  document.offline = !e.detail;
  // if (e.detail) {
  //   root.style.setProperty('--app-blue', '#007eef');
  //   // console.log('Back online');
  // } else {
  //   root.style.setProperty('--app-blue', '#7D7D7D');
  //   // console.log('Connection too slow');
  // }
});

const app = document.querySelector('#app .outlet');

fetch('/config.json')
  .then((result) => result.json())
  .then(async (config) => {
    console.log('[todo] Config loaded !!!');
    window.config = config;

    
    page('/', async () => {
      const module = await import('./views/Home.js');
      const Home = module.default;

      let todos = [];
      if (!document.offline) {
        const data = await fetchTodos();
        todos = await setTodos(data);
      } else {
        todos = await getTodos();
      }

      const el = Home(app, todos);
      el.addEventListener('create-todo', async ({ detail }) => {
        await setTodo(detail);
        if (!document.offline) {
          const result = await createTodo(detail);
          if (result !== false) {
            await setTodo(detail);
          }
        } else {
          detail.synced = true;
          await setTodo(detail);
          console.log('[todo] Todo created offline');
        }
      });
    });
    
    page();
  });
