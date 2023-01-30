import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import AuthContext from "../auth/authProvider";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

//yup setup
const userSchema = Yup.object().shape({
  name: Yup.string().required('This is a required field'),
  shape: Yup.string().required('This is a required field'),
  size: Yup.string().required('This is a required field'),
  'recieved on': Yup.string().required('This is a required field'),
  quantity: Yup.number('Has to be a number').required('This is a required field'),
  status: Yup.string().required('This is a required field'),
  job_id: Yup.string().required('This is a required field'),
});

const ProductCards = () => {
  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(userSchema)
  });
  
  let product = useSelector(state => state);

  //checks current use Auth level 
  const { clearance } = useContext(AuthContext);

  //handle showing modal
  const [showModal, setShowModal] = useState(false);

  // the product which was clicked to show the modal
  const [selectedProduct, setSelectedProduct] = useState({});

  function productCards() {
    if(product.products.result) {
      //format of cards 

      const productElements = product.products.result.map((product) => {
        return (
          <div className="products" key={product.name}>
            <h4 grid-area="name">{product.name}</h4>
            {clearance && <button grid-area="edit" type="button" onClick={() => {
              setShowModal(true);
              setSelectedProduct(product);
            }}>Edit</button>}
            <p><b>Size: </b>{product.size}</p>
            <p><b>Shape: </b>{product.shape}</p>
            <p><b>Status: </b>{product.status}</p>
            <p><b>Quantity: </b>{product.quantity}</p>
            <p><b>Recieved On: </b>{product['recieved on']}</p>
          </div>
        );
      });
      return productElements;
    } else return null;
  }

  function handleFormSubmit() {
    return null;
  }

  console.log(selectedProduct)

  return (
    <>
      {productCards()}
      {showModal && (
        <div className="modal-backdrop"onClick={() => setShowModal(false)}>
          <div id="modal">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <h3>Edit Product</h3>
            <div>
              <label>Name:</label>
              <input className="input-field" placeholder="'pvc pipes'"
              value={selectedProduct.name}
              {...register('name', {required: true})} />
              <p className="yup-errors">{errors.name?.message}</p>

              <label>Recieved On:</label>
              <input type="date" className="input-field" datepicker='datepicker' 
              defaultValue={selectedProduct['recieved on']}
              {...register('recieved on', {required: true})} />
              <p className="yup-errors">{errors.recieved_on?.message}</p>

              <label>Shape:</label>
              <input className="input-field" placeholder="'cube'"
              value={selectedProduct.shape}
              {...register('shape', {required: true})} />
              <p className="yup-errors">{errors.shape?.message}</p>

              <label>Size:</label>
              {/* select lineal ft vs square ft then user input*/}
              <input className="input-field" placeholder="'3'x5'x10''"
              value={selectedProduct.size}
              {...register('size', {required: true})} />
              <p className="yup-errors">{errors.size?.message}</p>

              <label>Quantity:</label>
              <input className="input-field" placeholder="'45'"
              value={selectedProduct.quantity}
              {...register('quantity', {required: true})} />
              <p className="yup-errors">{errors.quantity?.message}</p>

              <label>Status:</label>
              <select {...register('status', {required: true})}
              className='input-field'>
                <option value="Pending">Pending</option>
                <option value="Warehouse">At Warehouse</option>
                <option value='at site'>At Job Site</option>
              </select>
              <p className="yup-errors">{errors.status?.message}</p>
            </div>
          <button type='submit' className='btn btn-dark'onClick={() => setShowModal(false)}>Close</button>
        </form>
          </div>
        </div>
      )}
    </>
  )
  
}

export default ProductCards;
