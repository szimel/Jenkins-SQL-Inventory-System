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
      if (error) {
        return res.status(500).send({ error: error });
      }
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

  const query = 'UPDATE products SET ? WHERE idproducts = ?'

  pool.query(query, [newValues, productId])
    .then(function(results) {
      //handles an sql db error 
      if(results.warningStatus > 0) return res.status(400).json({error: 'error editing data'});
      
      return res.status(200).send({status: 'Sucess'});
    });
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
    //finds unpaid products with a close match to the query
    pool.query(`SELECT * FROM products WHERE paid = 'no' AND name LIKE '%${query}%'`)
    .then(results => {
      res.send(results);
    })
    .catch(error => {
      throw error;
  });

  } else {
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

//handles searches in extra
exports.getExtraProducts = function(req, res) {
  if(req.query.search === '') {
    const query = 'SELECT * FROM products WHERE extra_id = 1'

    pool.query(query)
      .then(results => {
        //formatting for frond end
        const result = results[0]
        return res.status(200).json({result});
      })
      .catch(error => {
        return res.status(401).json({message: error});
      });
  } else {
    const query = `SELECT * FROM products WHERE extra_id = 1 AND name LIKE '%${req.query.search}%'`

    pool.query(query)
      .then(results => {
        //foratting for front end
        const result = results[0];
        return res.status(200).json({result});
      })
      .catch(error => {
        return res.status(401).json({message: error});
      });
  }
}

//gets jobs by jobsite or jobsite + search
exports.getJobsiteProds = function(req, res) {

  //if something was searched
  if(req.query.search) {
    const query = `SELECT * FROM products WHERE job_id = ? AND name LIKE '%${req.query.search}%'`

    pool.query(query, [req.query.jobsite])
      .then(results => {
        //formatting for front end
        const result = results[0];
        return res.status(200).json({result});
      })
      .catch(error => {
        return res.status(401).json({message: error});
      });
  } else {

    const query = 'SELECT * FROM products WHERE job_id = ?';

    //grabs correct products for jobsite
    pool.query(query, [req.query.jobsite])
    .then((results) => {
      
      //formatting for front end
      const result = results[0];
      return res.status(200).json({result});
    })
    .catch(error => {
      return res.status(401).json({message: error});
    });
  }
};

