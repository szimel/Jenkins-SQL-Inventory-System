const mysql = require('mysql2/promise');  

// Connect to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's0mu3l',
  database: 'jenkinsdb'
});

exports.editProduct = function(req, res) {
  console.log('hot here ')
  //sets values to update db with 
  const data = req.body;
  const productId = data.id;
  const newValues = {
    name: data.name,
    shape: data.shape,
    size: data.size,
    'recieved on': data['recieved on'],
    paid: data.paid, //
    quantity: data.quantity,
    extra_id: data.extra_id,//
    status: data.status,
    job_id: data.job_id,
    'picked up': data['picked up'],
  };

  pool.query(
      'UPDATE products SET ? WHERE idproducts = ?',
      [newValues, productId],
      function(error, results, fields) {
        console.log(results);
        if (error) {
          return res.status(500).send({ error: error });
        }
        res.status(200).send({ message: 'Product updated successfully' });
      }
    );
}

//add jobsite to db
exports.newJobsite = function(req, res) {
  //data to insert 
  const data = req.body;

  // add data to db
  pool.query('INSERT INTO jobs SET ?', data, function(error, results, fields) {
    if (error) res.status(500).json({ message: error });
    return res.status(200).json({ data: results });
  });
};

//add product to db
exports.newProduct = function(req, res) {
  // data to insert
  const data = req.body;

  //add data to db
  pool.query('INSERT INTO products SET ?', data, function(error, results, fields) {
    if (error) res.status(500).json({ message: error });
    return res.status(200).json({ data: results });
  });
}; 

exports.getJobsites = function(req, res) {

  //returns all jobsites
  pool.query('SELECT * FROM jobs WHERE active = "yes"')
    .then((results) => {
      return res.status(200).json({jobsites: results})
  })
  .catch(error => {
      throw error;
  });
};

exports.getJobsiteProds = function(req, res) {

  //grabs correct products for jobsite
  pool.query('SELECT * FROM products WHERE job_id = ?', [req.body.jobsite])
  .then((results) => {
    
    //formatting for redux store
    const result = results[0];
    return res.status(200).json({result});
  })
  .catch(error => {
    return res.status(401).json({message: error});
  });
};

