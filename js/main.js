const input = document.getElementById('todoInput');
const ul = document.getElementById('listGroup');
const addBtn = document.getElementById('addBtn');



function createLi() {
  event.preventDefault();

  if (input.value === '') {
    setTimeout(() => {
      document.querySelector('.alert').style.display = 'none';
    }, 2000);
    document.querySelector('.alert').style.display = 'block';
    return false;
  }

  let li = document.createElement('li');
  li.className = 'list-group-item';

  li.innerHTML = `
  <input type="checkbox"class="form-check-input">
  <p class="list-text">${input.value}</p>
  <button id="delete" class="btn btn-outline-danger delete" value="delete">
  <i class="fas fa-trash"></i>
  </button>
  `;

  ul.appendChild(li);

  input.value = '';

  deleteTodo();
  saveIt();
  checkOut();
}


function deleteTodo() {
  let li = document.querySelectorAll('.list-group-item');

  for (let element of li) {
    let btn = element.childNodes[5];
    btn.addEventListener('click', () => {
      element.remove();
      localStorage['ul'] = ul.innerHTML;
    });
  }
}

input.addEventListener('keypress', key => {
  const keyEnter = 13;
  if (key.keyCode == keyEnter) {
    addBtn.addEventListener('click', createLi);
  }
});

function checkOut() {
  const checkbox = document.querySelectorAll('.form-check-input');

  for (item of checkbox) {
    item.addEventListener('click', e => {
      if (e.target.checked == true) {
        e.target.parentElement.classList.add('checked');
      } else if (e.target.checked == false) {
        e.target.parentElement.classList.remove('checked');
      }
    });
  }
}

function saveIt() {
  localStorage['ul'] = ul.innerHTML;

  if (localStorage['ul']) {
    ul.innerHTML = localStorage['ul'];
  }
}

function loadIt() {
  ul.innerHTML = localStorage.getItem('ul');
  deleteTodo();
  checkOut();
}

loadIt();