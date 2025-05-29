const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  alert("Access denied. Please login.");
  window.location.href = "login.html";
}
