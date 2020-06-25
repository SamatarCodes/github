const header = document.querySelector('.header');
const input = document.querySelector('.nav-toggle');
const searchInput = document.querySelector('#search-input');
const profileImage = document.querySelector('#profile-image');
const profileDescription = document.querySelector('.profile--description');
const profileName = document.querySelector('.profile--name');
const profileUsername = document.querySelector('.profile--username');
const userLocation = document.querySelector('.edit-area--country');

// * This is for the dropdown menu toggle
input.addEventListener('change', (e) => {
  if (e.target.checked) {
    header.classList.add('addToHeader');
  } else {
    header.classList.remove('addToHeader');
  }
});

//  * Create a helper function
const fetchData = async (searchUser) => {
  // Get user's profile
  const profileResponse = await axios.get(
    `https://api.github.com/users/${searchUser}`
  );
  // Get user's repo
  const userRepo = await axios.get(
    `https://api.github.com/users/${searchUser}/repos`
  );

  return (results = {
    profile: profileResponse.data,
    repo: userRepo.data,
  });
};

const updateUI = (userData) => {
  // update user's profile image
  profileImage.setAttribute('src', userData.profile.avatar_url);
  // update user's name
  profileName.innerHTML = `
  <span class="profile--name">${userData.profile.name}</span>
  `;

  // update user's username
  profileUsername.innerHTML = `
  <span class="profile--username">${userData.profile.login}</span>
  `;

  // update user's profile description
  profileDescription.innerHTML = `
  <p class="profile--description">${userData.profile.bio}</p>
  `;

  // update user's location
  userLocation.innerHTML = `
  <span class="edit-area--country">${userData.profile.location}</span>
  `;
};

const onInput = async (e) => {
  // Pass userInput to fetchData as argument
  const userData = await fetchData(e.target.value);
  console.log(userData);
  updateUI(userData);
};

// Search input
searchInput.addEventListener('keyup', debounce(onInput, 500));
