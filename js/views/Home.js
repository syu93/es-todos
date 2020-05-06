import todoCard from '../components/todo.js';

export default function Home(page, data) {
  page.innerHTML = '';
  const constructor = document.createElement('div');
  constructor.innerHTML = `
    <section class="h-full" name="Home">
      <h1>My awesome todo :</h1>
      <section class="todolist">
        <ul></ul>
      </section>
      <footer class="h-16 bg-gray-300 fixed bottom-0 inset-x-0">
        <form id="addTodo" class="w-full h-full flex justify-between items-center px-4 py-3">
          <input class="flex-1 py-3 px-4 rounded-sm h-full" type="text" name="" id="">
          <button class="ml-4 rounded-lg text-uppercase bg-blue-500 h-full text-center px-3 text-white font-bold" type="submit">Add</button>
        </form>  
      </footer>
    </section>
  `;

  const view = constructor
    .querySelector('[name="Home"]')
    .cloneNode(true);

  const form = view.querySelector('#addTodo');
  const input = form.querySelector('input');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === '') return console.warn('[todo] Value is required !!!');

    const todo = {
      id: Date.now(),
      title: input.value,
      synced: true,
      updated: false,
      done: false,
      date: Date.now()
    };

    const event = new CustomEvent('create-todo', { detail: todo });
    view.dispatchEvent(event);

    // Clean input
    input.value = '';
  });

  page.appendChild(view);
  return view;
}
