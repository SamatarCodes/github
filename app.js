const header = document.querySelector('.header');
const input = document.querySelector('.nav-toggle');

input.addEventListener('change', (e) => {
  if (e.target.checked) {
    header.classList.add('addToHeader');
  } else {
    header.classList.remove('addToHeader');
  }
});
