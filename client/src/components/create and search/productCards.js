import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../auth/authProvider";
import * as Yup from 'yup';

import { Formik, Form, Field } from 'formik';
import { deleteProduct, editProduct } from "../../actions";
import { useNavigate } from "react-router-dom";
import DisplayJobs from "./displayJobs";

//yup setup
const editSchema = Yup.object().shape({
  name: Yup.string().required('This is a required field'),
  shape: Yup.string().required('This is a required field'),
  size: Yup.string().required('This is a required field'),
  'recieved on': Yup.string().required('This is a required field'),
  quantity: Yup.number('Has to be a number').required('This is a required field'),
  status: Yup.string().required('This is a required field'),
  job_id: Yup.string().required('This is a required field'),
});

const ProductCards = () => {
  //from authProvider - lets this file and searchJobsite communicate
  const { setReRender} = useContext(AuthContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let Product = useSelector(state => state);

  //checks current use Auth level 
  const { clearance } = useContext(AuthContext);

  //handle showing modal
  const [showModal, setShowModal] = useState(false);

  // the product which was clicked to show the modal
  const [selectedProduct, setSelectedProduct] = useState({});

  function productCards() {
    if(Product.products.result) {

      //format of cards 
      const productElements = Product.products.result.map((product) => {
        return (
          <div className="products" key={product.name}>
            <h4 grid-area="name">{product.name}</h4>
            {clearance && <button grid-area="edit" type="button" onClick={(e) => {
              setReRender(false);
              setShowModal(true);
              //sets selectedProduct to clicked product
              setSelectedProduct(product);
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


  //function called on modal submit
  async function handleFormSubmit(values) {
    //so backend knows which product to edit
    values.id = selectedProduct.idproducts;
    values.extra_id = selectedProduct.extra_id;
    values.paid = selectedProduct.paid;

    //closes modal
    setShowModal(false);

    //backend call to db to update product then rerenders productcards 
    await editProduct(values, dispatch, navigate)
      .then(setReRender(true));
  };


  async function handleDelete() {
    const productId = selectedProduct.idproducts;

    await deleteProduct(productId, dispatch, navigate)
      .then(() => {
        //closes modal
        setShowModal(false)
        //re renders product cards
        setReRender(true);
      });
  }

  
  return(
    <>
      {productCards()}
      {showModal && (
        <div className="modal-backdrop">
          <div id="modal">
            <h5>Edit Product</h5>
            <Formik
            // Sets the values of form
              initialValues={{ 
                name: selectedProduct.name, 
                shape: selectedProduct.shape, 
                size: selectedProduct.size,
                'recieved on': selectedProduct['recieved on'],
                quantity: selectedProduct.quantity,
                status: selectedProduct.status,
                job_id: selectedProduct.job_id
              }}
              validationSchema={editSchema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                //backend function call
                handleFormSubmit(values);
              }}
            >
              {({ handleSubmit, isSubmitting, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <label>Product: </label>
                    <Field name="name" type="text" placeholder="' pvc pipes'" 
                    className='input-field'/>
                    {errors.name && touched.name ? <div>{errors.name}</div> : null}
                  </div>

                  <div>
                    <label>Shape: </label>
                    <Field name="shape" type="text" placeholder="'square'" 
                    className='input-field'/>
                    {errors.shape && touched.shape ? <div>{errors.shape}</div> : null}
                  </div>

                  <div>
                    <label>Size: </label>
                    <Field name="size" type="text" placeholder="4'x5'x5'" 
                    className='input-field'/>
                    {errors.size && touched.size ? <div>{errors.size}</div> : null}
                  </div>

                  <div>
                    <label>Quantity: </label>
                    <Field name="quantity" type="text" placeholder="'45" 
                    className='input-field'/>
                    {errors.quantity && touched.quantity ? <div>{errors.quantity}</div> : null}
                  </div>

                  <div>
                    <label>Recieved On: </label>
                    <Field name="recieved on" type="date" 
                    className='input-field'/>
                    {errors['recieved on'] && touched['recieved on'] ? <div>{errors['recieved on']}</div> : null}
                  </div>

                  <div>
                    <label>Status:</label>
                    <Field as='select' name='status' className='input-field'>
                      <option defaultValue="Warehouse">At Warehouse</option>
                      <option defaultValue='at site'>At Job Site</option> 
                    </Field>
                    {errors.status && touched.status ? <div>{errors.status}</div> : null}
                  </div>

                  <button type="submit" className='btn btn-dark' disabled={isSubmitting} 
                  // onClick={() => {}}
                  >
                    Submit
                  </button>
                  <button className="btn btn-danger" disabled={isSubmitting} onClick={() => handleDelete()}>Delete</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

    </>
  )
}

export default ProductCards;