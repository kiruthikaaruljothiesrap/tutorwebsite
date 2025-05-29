// ----- Navigation -----
const navButtons = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('.dashboard-section');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.section;
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === target);
    });
  });
});

// ----- Courses Section -----
const courseForm = document.getElementById('course-form');
const courseListTbody = document.querySelector('#course-list tbody');

function loadCourses() {
  const courses = JSON.parse(localStorage.getItem('tutorCourses') || '[]');
  courseListTbody.innerHTML = '';
  courses.forEach(course => {
    const tr = document.createElement('tr');
    // Escape HTML for safety, or use textContent only (here we trust input for demo)
    const youtubeLink = course.url 
      ? `<a href="${course.url}" target="_blank">Watch Video</a>` 
      : 'No Link';
    tr.innerHTML = `<td>${course.title}</td><td>${course.description}</td><td>${youtubeLink}</td>`;
    courseListTbody.appendChild(tr);
  });
  return courses;
}

function saveCourses(courses) {
  localStorage.setItem('tutorCourses', JSON.stringify(courses));
}

courseForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('course-title').value.trim();
  const description = document.getElementById('course-desc').value.trim();
  const url = document.getElementById('course-url').value.trim();
  if (!title || !description || !url) return alert('Please enter title, description and YouTube URL');
  const courses = loadCourses();
  courses.push({ title, description, url });
  saveCourses(courses);
  loadCourses();
  courseForm.reset();
});

loadCourses();

// ----- Chat Section -----
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('tutorChat') || '[]');
  chatWindow.innerHTML = '';
  messages.forEach(msg => {
    addMessageToChat(msg.text, msg.type);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return messages;
}

function saveMessages(messages) {
  localStorage.setItem('tutorChat', JSON.stringify(messages));
}

function addMessageToChat(text, type) {
  const div = document.createElement('div');
  div.classList.add('message', type);
  div.textContent = text;
  chatWindow.appendChild(div);
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  let messages = loadMessages();
  messages.push({ text, type: 'sent' });
  saveMessages(messages);
  addMessageToChat(text, 'sent');
  chatInput.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Simulated reply from tutor after 1 second
  setTimeout(() => {
    const reply = "Thanks for your message! I'll get back to you shortly.";
    messages = loadMessages();
    messages.push({ text: reply, type: 'received' });
    saveMessages(messages);
    addMessageToChat(reply, 'received');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1000);
});

loadMessages();

// ----- Manage Booking -----
const bookingTable = document.getElementById('booking-table');
const addRowBtn = document.getElementById('add-row-btn');
const addColBtn = document.getElementById('add-col-btn');

function addBookingRow() {
  const tbody = bookingTable.querySelector('tbody');
  const cols = bookingTable.querySelectorAll('thead th').length;
  const newRow = document.createElement('tr');
  for (let i = 0; i < cols; i++) {
    const td = document.createElement('td');
    if (i === 0) {
      // Auto increment Booking ID
      const lastRow = tbody.querySelector('tr:last-child');
      const lastId = lastRow ? parseInt(lastRow.cells[0].textContent) : 0;
      td.textContent = lastId + 1;
    } else {
      td.contentEditable = 'true';
      td.textContent = '';
    }
    newRow.appendChild(td);
  }
  tbody.appendChild(newRow);
}

function addBookingColumn() {
  const theadRow = bookingTable.querySelector('thead tr');
  const newTh = document.createElement('th');
  newTh.textContent = `Col ${theadRow.children.length + 1}`;
  theadRow.appendChild(newTh);

  const tbodyRows = bookingTable.querySelectorAll('tbody tr');
  tbodyRows.forEach(row => {
    const newTd = document.createElement('td');
    newTd.contentEditable = 'true';
    row.appendChild(newTd);
  });
}

addRowBtn.addEventListener('click', addBookingRow);
addColBtn.addEventListener('click', addBookingColumn);

// ----- Calendar Section -----
const calendarDate = document.getElementById('calendar-date');
const calendarNotes = document.getElementById('calendar-notes');
const saveNoteBtn = document.getElementById('save-note-btn');
const notesHistory = document.getElementById('notes-history');

function loadNotes() {
  return JSON.parse(localStorage.getItem('tutorCalendarNotes') || '{}');
}

function saveNotes(notes) {
  localStorage.setItem('tutorCalendarNotes', JSON.stringify(notes));
}

function refreshNotesHistory() {
  const notes = loadNotes();
  notesHistory.innerHTML = '';

  // Add dummy events if none
  if (Object.keys(notes).length === 0) {
    notes['2025-05-10'] = 'Prepare syllabus for new course';
    notes['2025-05-15'] = 'Meeting with parents';
    saveNotes(notes);
  }

  const sortedDates = Object.keys(notes).sort((a, b) => new Date(b) - new Date(a));
  sortedDates.forEach(date => {
    const li = document.createElement('li');
    li.textContent = `${date}: ${notes[date]}`;
    notesHistory.appendChild(li);
  });
}

calendarDate.addEventListener('change', () => {
  const notes = loadNotes();
  const date = calendarDate.value;
  calendarNotes.value = notes[date] || '';
});

saveNoteBtn.addEventListener('click', () => {
  const date = calendarDate.value;
  if (!date) return alert('Please select a date');
  const noteText = calendarNotes.value.trim();
  const notes = loadNotes();
  notes[date] = noteText;
  saveNotes(notes);
  refreshNotesHistory();
  alert('Note saved!');
});

refreshNotesHistory();

// ----- Ratings Section -----
const ratingsTableBody = document.querySelector('#ratings-table tbody');

const dummyRatings = [
  { course: 'React Basics', skill: 4.5, experience: 4, reviews: 10, feedback: 'Very helpful and clear explanations.' },
  { course: 'Node.js Mastery', skill: 4.7, experience: 4.5, reviews: 15, feedback: 'Excellent hands-on sessions.' },
  { course: 'MongoDB Intro', skill: 4.2, experience: 3.8, reviews: 8, feedback: 'Good for beginners.' },
  { course: 'JavaScript Deep Dive', skill: 4.8, experience: 4.6, reviews: 20, feedback: 'Detailed and thorough.' },
  { course: 'CSS Flexbox & Grid', skill: 4.1, experience: 3.9, reviews: 12, feedback: 'Practical and easy to follow.' },
];

function loadRatings() {
  ratingsTableBody.innerHTML = '';
  dummyRatings.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.course}</td>
      <td>${r.skill}</td>
      <td>${r.experience}</td>
      <td>${r.reviews}</td>
      <td>${r.feedback}</td>
    `;
    ratingsTableBody.appendChild(tr);
  });
}

loadRatings();

// ----- Notifications Section -----
const notificationList = document.getElementById('notification-list');

const dummyNotifications = [
  'New student enrolled in React Basics.',
  'Payment received from parent for Node.js Mastery.',
  'Upcoming meeting scheduled for 2025-05-20.',
  'Course MongoDB Intro received a new review.',
  'Server maintenance scheduled on 2025-05-18.',
];

function loadNotifications() {
  notificationList.innerHTML = '';
  dummyNotifications.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    notificationList.appendChild(li);
  });
}

loadNotifications();

// ----- Earnings Section -----
const earningsTableBody = document.querySelector('#earnings-table tbody');

const dummyEarnings = [
  { date: '2025-05-01', source: 'Course Sale - React Basics', amount: '$150', notes: 'Paid via PayPal' },
  { date: '2025-05-05', source: 'Tips from Parent', amount: '$50', notes: 'Great teaching!' },
  { date: '2025-05-10', source: 'Course Sale - Node.js Mastery', amount: '$200', notes: 'Paid via Stripe' },
  { date: '2025-05-12', source: 'Tips from Parent', amount: '$30', notes: 'Thank you!' },
  { date: '2025-05-14', source: 'Course Sale - MongoDB Intro', amount: '$120', notes: 'Paid via bank transfer' },
];

function loadEarnings() {
  earningsTableBody.innerHTML = '';
  dummyEarnings.forEach(entry => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.source}</td>
      <td>${entry.amount}</td>
      <td>${entry.notes}</td>
    `;
    earningsTableBody.appendChild(tr);
  });
}

loadEarnings();
