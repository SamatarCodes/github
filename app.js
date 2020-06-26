const header = document.querySelector('.header');
const input = document.querySelector('.nav-toggle');
const searchInput = document.querySelector('#search-input');
const profileImage = document.querySelector('#profile-image');
const profileDescription = document.querySelector('.profile--description');
const profileName = document.querySelector('.profile--name');
const profileUsername = document.querySelector('.profile--username');
const userLocation = document.querySelector('.edit-area--country');
const userRepos = document.querySelector('.user-repo');
const userFollowers = document.querySelector('.followers');
const userFollowing = document.querySelector('.following');
const repoContainer = document.querySelector('.projects__list');
const alertBox = document.querySelector('.alertBox');

// * This is for the dropdown menu toggle
input.addEventListener('change', (e) => {
  if (e.target.checked) {
    header.classList.add('addToHeader');
  } else {
    header.classList.remove('addToHeader');
  }
});

// * Alert message
const alertMessage = () => {
  alertBox.innerHTML = `
  <div class="alerts">We couldn’t find any repositories matching: </div>
  `;

  setTimeout(() => {
    clearAlertMessage();
  }, 3000);
};

const clearAlertMessage = () => {
  alertBox.innerHTML = '';
};

//  * Create a helper function to fetch the data
const fetchData = async (searchUser) => {
  // Get user's profile
  const profileResponse = await axios
    .get(`https://api.github.com/users/${searchUser}`)
    .catch((error) => {
      if (error.response.status === 404) {
        console.log(error.response.data.message);
        alertMessage();
      }
    });

  // Get user's repo
  const userRepo = await axios.get(
    `https://api.github.com/users/${searchUser}/repos`
  );

  return (results = {
    profile: profileResponse.data,
    repo: userRepo.data,
  });
};

const updateUserProfile = (userData) => {
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

  // update user's repos
  userRepos.innerHTML = `
  <span class="repository--counter user-repo">${userData.profile.public_repos}</span>
  `;
  // update user's followers
  userFollowers.innerHTML = `
  <span class="repository--counter followers">${userData.profile.followers}</span>
  `;

  userFollowing.innerHTML = `
  <span class="repository--counter following">${userData.profile.following}</span>
  `;
};

const updateUserRepo = (userData) => {
  repoContainer.innerHTML = '';
  // loop through the repo and pick the first 4
  for (let i = 0; i < 6; i++) {
    repoContainer.innerHTML += `
    <div class="projects__container">
    <!-- first row : title -->
    <div class="project__title">
      <i class="fas fa-book"></i>
      <span class="project__title--name"
        ><a href="${userData[i].html_url}" target="_blank">${userData[i].full_name}</a>
      </span>
    </div>
    <div class="project__description">
      <p>
        <i class="fas fa-cloud-showers-heavy"></i>${userData[i].description}
    </div>
  </div>
    `;
  }
};

const onInput = async (e) => {
  // Pass userInput to fetchData as argument
  const userData = await fetchData(e.target.value);

  updateUserProfile(userData);
  updateUserRepo(userData.repo);
};

// * Event listener to the user's input field
searchInput.addEventListener('keyup', debounce(onInput, 500));
