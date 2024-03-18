// Function to fetch GitHub user data from the API
async function fetchUserData(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      return null;
    }
  }
  
  // Function to display user profile cards
  function displayUserProfile(user) {
    const userProfile = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${user.avatar_url}" class="card-img-top" alt="User Avatar">
          <div class="card-body">
            <h5 class="card-title">Name: ${user.login}</h5>
            <p class="card-text">Bio: ${user.bio || 'No bio available'}</p>
            <p class="card-text">Blog: <a href="${user.blog}" target="_blank">${user.blog || 'No blog available' }</a></p>
            <p class="card-text">Location: ${user.location}</p>
            <a href="${user.html_url}" class="btn btn-primary">View Profile</a>
          </div>
        </div>
      </div>
    `;
    document.getElementById('user-profiles').innerHTML = userProfile;
  }
  
  // Event listener for form submission
  document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    if (!username) {
      alert('Please enter a GitHub username');
      return;
    }
  
    const userData = await fetchUserData(username);
    if (userData) {
      displayUserProfile(userData);
    } else {
      alert('User not found');
    }
  
    // Clear input field after search
    document.getElementById('username').value = '';
  });
  