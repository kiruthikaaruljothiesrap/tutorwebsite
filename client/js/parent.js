document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const parentId = user._id; // assuming this is a parent dashboard
  const tutorId = user.tutorId || "TUTOR_ID_FROM_RELATION"; // replace with actual logic

  const chatBtn = document.getElementById('sendChatBtn');
  const chatBox = document.getElementById('chatBox');

  chatBtn.addEventListener('click', async () => {
    const msg = document.getElementById('chatMsg').value;

    const res = await fetch('/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parentId,
        tutorId,
        sender: "parent",
        content: msg
      })
    });

    const data = await res.json();
    if (data.success) alert("Message sent!");
  });

  async function loadChat() {
    const res = await fetch(`/api/chat/fetch?parentId=${parentId}&tutorId=${tutorId}`);
    const data = await res.json();
    if (data.chat) {
      chatBox.innerHTML = ''; // clear previous messages
      data.chat.messages.forEach(m => {
        const div = document.createElement('div');
        div.innerText = `${m.sender}: ${m.content}`;
        chatBox.appendChild(div);
      });
    }
  }

  loadChat();
});
