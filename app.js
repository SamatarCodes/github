const header = document.querySelector('.header');
const input = document.querySelector('.nav-toggle');
const searchInput = document.querySelector('#search-input');

// * This is for the dropdown menu toggle
input.addEventListener('change', (e) => {
  if (e.target.checked) {
    header.classList.add('addToHeader');
  } else {
    header.classList.remove('addToHeader');
  }
});

// Search input
searchInput.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;
});

// Create a helper function
