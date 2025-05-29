exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === 'test@example.com' && password === 'password123') {
    res.json({ message: 'Login successful', user: { email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
