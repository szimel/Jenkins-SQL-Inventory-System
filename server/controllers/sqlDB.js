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
  console.log(req.body);

  //returns all jobsites
  pool.query('SELECT * FROM jobs')
    .then((results) => {
      return res.status(200).json({jobsites: results})
  })
  .catch(error => {
      throw error;
  });
};

exports.getJobsiteProds = function(req, res) {
  console.log('got here');
  console.log(req.body)

  //grabs correct products for jobsite
  pool.query('SELECT * FROM products WHERE job_id = ?', [req.body.jobsite])
  .then((results) => {
    return res.status(200).json({jobsites: results})
  })
  .catch(error => {
    return res.status(401).json({message: error});
  });
} //you up haha lmao lol ??

//this is a needed git push

// if(Object.keys(req.body).length === 0) {
//   pool.query('SELECT * FROM jobs')
//     .then((results) => {
//       return res.status(200).json({jobsites: results})
//   })
//   .catch(error => {
//       throw error;
//   });
// } else {
//   const jobId = req.body.job_id;
//   pool.query('SELECT * FROM products WHERE job_id = ?', [jobId])
//     .then((results) => {
//       return res.status(200).json({jobsites: results})
//     })
//     .catch(error => {
//       throw error;
//     });
// }


