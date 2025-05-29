document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.querySelector('input[name="role"]:checked').value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  });

  const data = await res.json();

  if (data.success) {
    localStorage.setItem('user', JSON.stringify({
      _id: data.user._id,
      email: data.user.email,
      role: data.user.role
    }));

    // Redirect to respective dashboard
    if (data.user.role === 'tutor') {
      window.location.href = 'tutor-dashboard.html';
    } else if (data.user.role === 'parent') {
      window.location.href = 'parent-dashboard.html';
    } else {
      window.location.href = 'student-dashboard.html';
    }
  } else {
    alert(data.message || 'Login failed');
  }
});
