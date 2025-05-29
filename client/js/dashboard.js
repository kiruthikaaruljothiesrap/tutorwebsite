document.querySelectorAll('.notification').forEach(notif => {
  notif.addEventListener('click', () => {
    alert("You have unread messages or alerts!");
  });
});
