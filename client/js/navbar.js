document.getElementById('navbar').innerHTML = `
  <h2>Tutor Dashboard</h2>
  <div class="notification">
    <span class="bell">&#128276;</span>
    <span class="count" id="notifCount">0</span>
  </div>
`;

// Fetch dynamic notification count
fetch('http://localhost:5000/api/notifications/tutor')
  .then(res => res.json())
  .then(data => {
    document.getElementById('notifCount').innerText = data.count;
  })
  .catch(err => {
    console.error("Error fetching notifications:", err);
  });
