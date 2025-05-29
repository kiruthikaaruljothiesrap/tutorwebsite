document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const tutorId = user._id; // Get actual tutor ID from localStorage

  const addCourseBtn = document.getElementById('addCourseBtn');
  const courseList = document.getElementById('courseList');

  // Add course
  if (addCourseBtn) {
    addCourseBtn.addEventListener('click', async () => {
      const title = document.getElementById('courseTitle').value;
      const description = document.getElementById('courseDesc').value;

      const res = await fetch('/api/course/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, tutorId })
      });

      const data = await res.json();
      if (data.success) {
        alert('Course added!');
        // Optionally refresh the course list
        courseList.innerHTML = ''; // Clear old list
        loadCourses();             // Reload
      }
    });
  }

  // Fetch courses
  async function loadCourses() {
    const res = await fetch(`/api/course/all?tutorId=${tutorId}`);
    const data = await res.json();
    courseList.innerHTML = ''; // Clear previous list before loading

    data.courses.forEach(course => {
      const div = document.createElement('div');
      div.innerHTML = `<p><strong>${course.title}</strong>: ${course.description}</p>`;
      courseList.appendChild(div);
    });
  }

  loadCourses();
});
