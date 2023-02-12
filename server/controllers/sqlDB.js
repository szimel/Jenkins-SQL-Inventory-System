const mysql = require('mysql2/promise');  

// Connect to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 's0mu3l',
  database: 'jenkinsdb'
});


exports.deleteProduct = function(req, res) {
  const productId = req.body.id;


  pool.query(
    'DELETE FROM products WHERE idproducts = ?',
    [productId],
    function(error, results, fields) {
      // console.log(results);
      if (error) {
        return res.status(500).send({ error: error });
      }
      console.log('worked')
      res.status(200).send({ message: 'Product deleted successfully' });
    }
  );
}

//edits product but on pay
exports.editPayProduct = async (req, res) => {
  const id = req.body.id;
  const query = "UPDATE products SET paid = 'yes' WHERE idproducts = ?";

  //awaits server response to send status to frontend
  await pool.query(query, [id])
    .then(() => {
      res.send({ success: true });
    }).catch(function(err) {
      res.status(500).send({error: err})
      return new Error(err);
    });
};



//edits a product
exports.editProduct = function(req, res) {
  //sets values to update db with 
  const data = req.body;
  const productId = data.id;
  const newValues = {
    name: data.name,
    shape: data.shape,
    size: data.size,
    'recieved on': data['recieved on'],
    paid: data.paid, 
    quantity: data.quantity,
    extra_id: data.extra_id,
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

//grabs all jobsites and send to front end
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

//gets pay products on load and by search terms
exports.getPayProducts = function(req, res) {
  //sets query as a value or undefined
  const query = req.query.query

  if (query) {
    console.log('made it to query');
    //finds unpaid products with a close match to the query
    pool.query(`SELECT * FROM products WHERE paid = 'no' AND name LIKE '%${query}%'`)
    .then(results => {
      res.send(results);
    })
    .catch(error => {
      throw error;
  });

  } else {
    console.log('makde it to norm');
      //returns all products that haven't been paid
      pool.query('SELECT * FROM products WHERE paid = "no"')
      .then(results => {
        res.send(results);
    })
    .catch(error => {
        throw error;
    });
  }
};

exports.getProduct = function(req, res) {
  pool.query(`SELECT * FROM products ORDER BY idproducts DESC LIMIT 1`)
    .then(rows => {
      res.send(rows[0]);
    })
    .catch(error => {
      console.error(error);
      res.send(500, error);
    });
};

exports.getJobsite = function(req, res) {
  pool.query(`SELECT * FROM jobs ORDER BY idjobs DESC LIMIT 1`)
  .then(rows => {
    res.send(rows[0]);
  })
  .catch(error => {
    console.error(error);
    res.send(500, error);
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

