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
            {clearance && <button grid-area="edit" type="button" onClick={(e) => {
              handleEditClick(e, product);
            }}>Edit</button>}
            <p grid-area='size'><b>Size: </b>{product.size}</p>
            <p grid-area='shape'><b>Shape: </b>{product.shape}</p>
            <p grid-area='status'><b>Status: </b>{product.status}</p>
            <p grid-area='quantity'><b>Quantity: </b>{product.quantity}</p>
            <p grid-area='recievedon'><b>Recieved On: </b>{product['recieved on']}</p>
          </div>
        );
      });
      return productElements;
    } else return null;
  }

  function handleFormSubmit() {
    return null;
  }


  const [formData, setFormData] = useState({});

function handleEditClick(e, product) {
  e.target.click();
  setFormData({
    name: product.name,
    recievedOn: product["recieved on"],
    shape: product.shape,
    size: product.size,
    quantity: product.quantity,
    status: product.status
  });
  setShowModal(true);
}

// return (
//   <>
//   {productCards()}
//   {showModal && (
//     <form onSubmit={handleSubmit(handleFormSubmit)}>
//       <h3>Edit Product</h3>
//       <div>
//         <label>Name:</label>
//         <input className="input-field" placeholder="'pvc pipes'"
//           value={formData.name}
//           onChange={(e) => setFormData({...formData, name: e.target.value})}
//           {...register('name', {required: true})} />
//         <p className="yup-errors">{errors.name?.message}</p>

//         <label>Recieved On:</label>
//         <input type="date" className="input-field" datepicker='datepicker' 
//           value={formData.recievedOn}
//           onChange={(e) => setFormData({...formData, recievedOn: e.target.value})}
//           {...register('recieved on', {required: true})} />
//         <p className="yup-errors">{errors.recieved_on?.message}</p>

//         {/* ... */}
//       </div>
//       <button type='submit' className='btn btn-dark'onClick={() => {
//         setShowModal(false);
//         setFormData(formData);
//       }}>Close</button>
//     </form>
//   )}
//   </>
// );


  return (
    <>
      {productCards()}
      {showModal && (
        <div className="modal-backdrop">
          <div id="modal">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <h3>Edit Product</h3>
            <div>
            <label>Name:</label>
            <input className="input-field" placeholder="'pvc pipes'"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              {...register('name', {required: true})} />
            <p className="yup-errors">{errors.name?.message}</p>

              <label>Recieved On:</label>
              <input type="date" className="input-field" datepicker='datepicker' 
              value={formData['recieved on']}
              onChange={(e) => setFormData({...formData, recievedOn: e.target.value})}
              {...register('recieved on', {required: true})} />
              <p className="yup-errors">{errors.recieved_on?.message}</p>

              <label>Shape:</label>
              <input className="input-field" placeholder="'cube'"
              value={formData.shape}
              onChange={(e) => setFormData({...formData, shape: e.target.value})}
              {...register('shape', {required: true})} />
              <p className="yup-errors">{errors.shape?.message}</p>

              <label>Size:</label>
              {/* select lineal ft vs square ft then user input*/}
              <input className="input-field" placeholder="'3'x5'x10''"
              defaultValue={formData.size}
              onChange={(e) => setFormData({...formData, size: e.target.value})}
              {...register('size', {required: true})} />
              <p className="yup-errors">{errors.size?.message}</p>

              <label>Quantity:</label>
              <input className="input-field" placeholder="'45'"
              defaultValue={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              {...register('quantity', {required: true})} />
              <p className="yup-errors">{errors.quantity?.message}</p>

              <label>Status:</label>
              <select {...register('status', {required: true})}
              className='input-field'>
                <option defaultValue="Pending">Pending</option>
                <option defaultValue="Warehouse">At Warehouse</option>
                <option defaultValue='at site'>At Job Site</option>
              </select>
              <p className="yup-errors">{errors.status?.message}</p>
            </div>
          <button type='submit' className='btn btn-dark'onClick={() => {
            setShowModal(false)
            setFormData(formData);
          }}>Close</button>
        </form>
          </div>
        </div>
      )}
    </>
  )
  
}

export default ProductCards;
