import { html, render } from '../../web_modules/lit-html.js';
import '../../web_modules/lit-icon.js';
import todoCard from '../components/todo-card.js';


export default function Home(page, data) {
  const properties = {
    todo: '',
  };
  const template = ({ data, properties }) => html`
    <section class="h-full">
      <div ?hidden="${!data.length}">
        <header>
          <h1 class="mt-2 px-4 text-xl">My awesome todos : </h1>
        </header>
        <main class="todolist px-4 pb-20">
          <ul>
            ${data.map(todo => todoCard(todo))}
          </ul>
        </main>
      </div>
      <div class="mt-8" ?hidden="${data.length}">
        <img class="object-contain px-20" src="/img/nodata.svg" alt="No data">
        <p class="mt-4 text-center text-xl">No todos yet, try to create a new one</p>
      </div>
      <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
        <form @submit="${handleForm}" id="addTodo" class="w-full h-full flex justify-between items-center px-4 py-3">
          <label class="flex-1" aria-label="Add todo input">
            <input
              autocomplete="off"
              .value="${properties.todo}"
              @input="${e => properties.todo = e.target.value}"
              class="py-3 px-4 rounded-sm w-full h-full"
              type="text"
              placeholder="Enter a new todo ..."
              name="todo">
          </label>
          <button
            aria-label="Add"
            class="ml-4 rounded-lg text-uppercase bg-heraku h-full text-center px-3 uppercase text-white font-bold flex justify-center items-center"
            type="submit">Add<lit-icon class="ml-2" icon="send"></lit-icon></button>
        </form>  
      </footer>
    </section>
    <lit-iconset>
      <svg><defs>
        <g id="delete"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g>
        <g id="cloud-off"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z"></path></g>
        <g id="send"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g>
      </defs></svg>
    </lit-iconset>
  `;

  renderView(data);

  function handleForm(e) {
    e.preventDefault();
    if (properties.todo === '') return console.warn('[todo] Value is required !!!');

    const todo = {
      id: Date.now(),
      title: properties.todo,
      synced: 'true',
      updated: 'false',
      done: 'false',
      deleted: 'false',
      date: Date.now()
    };

    const event = new CustomEvent('create-todo', { detail: todo });
    document.dispatchEvent(event);

    // Clean input
    properties.todo = null;
    renderView(data);
  }

  function renderView(data) {
    const view = template({ data, properties });
    render(view, page);
    const input = document.querySelector('[name="todo"]');
    input.value = '';
  }

  document.addEventListener('render-view', ({ detail }) => {
    renderView(detail);
  });
}
