const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


// Connect to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's0mu3l',
  database: 'jenkinsdb'
});


exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  // Search for the user with the email
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );


  if(rows.length>0) {
    return res.status(409).json({error: 'User already exists'});
  };

  try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user to the database
      pool.query(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, hashedPassword]
      );
      const token = jwt.sign({ sub: req.user, clearance: null, user: email}, process.env.secret, { expiresIn: '1h' });
      res.status(200).json({ message: 'User created', token });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.logIn = async (req, res) => {
  // Generate JWT
  const token = jwt.sign({ sub: req.user.id, clearance: req.user.clearance, user: req.user.email }, process.env.secret, { expiresIn: '1h' });

  res.json({ message: 'Logged in', token });
} ;

exports.currentUser = (req, res) => {
  let clearance = req.user.clearance || null;
  data = {
    email: req.user.email,
    auth: clearance
  }
  res.send(data);
};