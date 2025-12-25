// Fetch basic profile info
fetch("/profile/data")
  .then(res => res.json())
  .then(user => {
    document.getElementById("profile-header").textContent = `${user.name}'s Profile`;
    document.getElementById("email").innerHTML = `<strong>Email:</strong> ${user.email}`;
    document.getElementById("birthday").innerHTML = `<strong>Birthday:</strong> ${user.birthday}`;

    const friendsContainer = document.getElementById("friends-container");
    if(user.friends.length > 0){
      user.friends.forEach(f => {
        const div = document.createElement("div");
        div.className = "card friend-card";
        div.textContent = f.name;
        friendsContainer.appendChild(div);
      });
    } else friendsContainer.innerHTML = "<p>No friends data available</p>";
  });

// Fetch hardcoded photo
fetch("/profile/photos")
  .then(res => res.json())
  .then(photos => {
    const photosContainer = document.getElementById("photos-container");
    if(photos.length > 0){
      photos.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<img src="${p.source}" alt="Photo">`;
        photosContainer.appendChild(div);
      });
    } else photosContainer.innerHTML = "<p>No photos available</p>";
  });
