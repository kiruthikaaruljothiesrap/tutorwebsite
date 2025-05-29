const themeToggleBtn = document.getElementById('theme-toggle');

function toggleTheme() {
  document.body.classList.toggle('dark-theme');

  // Update icon based on current theme
  const isDark = document.body.classList.contains('dark-theme');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️';
  }
});

themeToggleBtn.addEventListener('click', toggleTheme);
