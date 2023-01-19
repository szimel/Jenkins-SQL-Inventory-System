const mysql = require('mysql2/promise');  

// Connect to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's0mu3l',
  database: 'jenkinsdb'
});

//add jobsite to db
exports.newJobsite = function(req, res) {
  //data to insert
  const data = req.body;
  console.log(data);

  //add data to db
  pool.query('INSERT INTO jobs SET ?', data, function(error, results, fields) {
    if (error) res.status(500).json({ message: error });
    return res.status(200).json({ data: results });
  });
}

//add product to db
exports.newProduct = function(req, res) {
  // data to insert
  const data = req.body;

  //add data to db
  pool.query('INSERT INTO products SET ?', data, function(error, results, fields) {
    if (error) res.status(500).json({ message: error });
    return res.status(200).json({ data: results });
  });
}

exports.getJobsites = function(req, res) {
  //grabs all rows in jobs
  pool.query('SELECT * FROM jobs')
  .then((results) => {
      return res.status(200).json({jobsites: results})
  })
  .catch(error => {
      throw error;
  });
  
}
