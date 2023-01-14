const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
      const token = jwt.sign({ sub: req.user }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ message: 'User created', token });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.logIn = async (req, res) => {
  // Generate JWT
  const token = jwt.sign({ sub: req.user.id }, 'secret', { expiresIn: '1h' });

  res.json({ message: 'Logged in', token });
} ;