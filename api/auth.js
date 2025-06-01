const express = require('express');
const router = express.Router();

// Placeholder for user data storage (replace with a database in a real app)
const users = [];

// Register endpoint
router.post('/register', (req, res) => {
  console.log('Received registration request:', req.body);
  const { email, password, name } = req.body;

  // Basic validation
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check if user already exists (basic check)
  if (users.find(user => user.email === email)) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  // In a real app, hash the password before storing
  const newUser = {
    id: Date.now().toString(), // Simple unique ID
    email,
    name,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);

  console.log('User registered:', newUser);

  // In a real app, you would create a session or token here
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Login endpoint
router.post('/login', (req, res) => {
  console.log('Received login request:', req.body);
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Find user (in a real app, compare hashed password)
  const user = users.find(user => user.email === email);

  if (!user || password !== 'password123') { // Replace 'password123' with actual password validation
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // In a real app, create and return a session or token
  res.status(200).json({ message: 'Login successful', user });
});

// Get current user endpoint (requires authentication in a real app)
router.get('/user', (req, res) => {
  console.log('Received get user request');
  // In a real app, you would get the user from the session or token
  // For now, we'll just return a placeholder user or null
  const currentUser = users[0] || null; // Return the first user as placeholder

  if (currentUser) {
    res.status(200).json({ user: currentUser });
  } else {
    res.status(404).json({ message: 'No user logged in' });
  }
});

// Logout endpoint (requires authentication in a real app)
router.post('/logout', (req, res) => {
  console.log('Received logout request');
  // In a real app, you would destroy the session or invalidate the token
  res.status(200).json({ message: 'Logout successful' });
});

// Update name endpoint (requires authentication in a real app)
router.put('/user', (req, res) => {
  console.log('Received update user request:', req.body);
  const { name } = req.body;
  // In a real app, find the authenticated user and update their name
  // For now, we'll just acknowledge the request
  res.status(200).json({ message: 'User update request received' });
});

// Update password endpoint (requires authentication in a real app)
router.put('/user/password', (req, res) => {
    console.log('Received update password request:', req.body);
    const { password, oldPassword } = req.body;
    // In a real app, find the authenticated user, verify old password, and update password
    // For now, we'll just acknowledge the request
    res.status(200).json({ message: 'Password update request received' });
  });

module.exports = router; 