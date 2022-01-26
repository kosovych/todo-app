function getTasks() {
  fetch('http://localhost:3333/tasks')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      createList(data);
    });
}

getTasks();

function createList(tasks) {
  const fragment = document.createDocumentFragment();
  tasks.map(task => {
    const li = createListEl(task);
    fragment.appendChild(li);
  });

  const ul = document.createElement('ul');
  ul.appendChild(fragment);
  const list = document.getElementById('list');
  list.innerHTML = '';
  list.appendChild(ul);
};

function createListEl(task) {
  const li = document.createElement('li');
  const h1 = document.createElement('h1');
  const p = document.createElement('p');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.id = task.id;

  if (task.status === "COMPLETED") {
    li.style.textDecoration = 'line-through';
  }

  h1.innerText = task.title;
  p.innerText = task.description;

  li.appendChild(checkbox);
  li.appendChild(h1);
  li.appendChild(p);

  return li
}

const form = document.getElementById('form');
form.onsubmit = function onSubmit(e) {
  e.preventDefault();

  fetch('http://localhost:3333/tasks/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
    })
  })
  .then(response => response.json())
  .then(data => {
    createList(data);
  });
}
