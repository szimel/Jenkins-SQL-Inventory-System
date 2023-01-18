const mysql = require('mysql2/promise');  

// Connect to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's0mu3l',
  database: 'jenkinsdb'
});

exports.newProduct = function(req, res) {
  // data to insert
  const data = {
    name: 'Product Name',
    shape: 'Product Shape',
    size: 'Product Size',
    recieved_on: '2022-01-01',
    quantity: 5,
    extra_id: 1234,
    status: 'available',
    job_id: 1,
    paid: 1,
    picked_up: '2022-01-02'
  };

  //add data to db
  pool.query('INSERT INTO products SET ?', data, function(error, results, fields) {
    if (error) res.status(500).json({ message: error });
    return res.status(200).json({ data: results });
  });

}