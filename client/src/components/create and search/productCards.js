import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import AuthContext from "../auth/authProvider";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Formik, Form, Field } from 'formik';

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
  //basic yup setup
  // const { register, handleSubmit, formState: { errors }} = useForm({
  //   resolver: yupResolver(editSchema)
  // });
  
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
  
  return(
    <>
      {productCards()}
      {showModal && (
        <div className="modal-backdrop">
          <div id="modal">
            <Formik
              initialValues={{ 
                name: formData.name, 
                shape: formData.shape, 
                size: formData.size,
                'recieved on': formData['recieved on'],
                quantity: formData.quantity,
                status: formData.status,
                job_id: formData.job_id
              }}
              validationSchema={editSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                actions.setSubmitting(false);
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
                    <Field as='select' name='status'>
                      <option defaultValue="Warehouse">At Warehouse</option>
                      <option defaultValue='at site'>At Job Site</option> 
                    </Field>
                  </div>

                  <button type="submit" className='btn btn-dark' disabled={isSubmitting} 
                  onClick={() => {setShowModal(false)}}>
                    Submit
                  </button>
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
