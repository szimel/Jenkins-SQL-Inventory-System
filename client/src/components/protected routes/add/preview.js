import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProduct } from "../../../actions";
import Header from "../../header";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { deleteProduct, editProduct } from "../../../actions";


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

const Preview = () => {
  //for axios callback
  const dispatch = useDispatch();
  const navigate= useNavigate();

  //stores product info
  const [product, setProduct] = useState(null);
  //lets Preview know when to reRender product card
  const [reRender, setReRender] = useState(null);
  //handles showing modal 
  const [showModal, setShowModal] = useState(false);

  //sets db data to var
  useEffect(() => {
    productData().then(res => setProduct(res[0]))
      .then(displayProduct());
  }, [reRender]);

  //gets product from database
  async function productData() {
    try {
      const response = await getProduct(dispatch, navigate);
      return response;
    } catch (error) {
      console.error(error);
    };
  }

  function run() {
    console.log(product);
  }

  //ui for product, making it a function so I can handle when product is null
  function displayProduct() {
    if (product === null) {
      return null;
    }
    return (
      <div className="container mt-5">
        <h5>Please confirm the product is correct:</h5>
        <div className="products" key={product.name}>
        <h4 grid-area="name">{product.name}</h4>
            <button grid-area="edit" type="button" onClick={(e) => {
              setReRender(false);
              setShowModal(true);
            }}>Edit</button>
            <p grid-area='size'><b>Size: </b>{product.size}</p>
            <p grid-area='shape'><b>Shape: </b>{product.shape}</p>
            <p grid-area='status'><b>Status: </b>{product.status}</p>
            <p grid-area='quantity'><b>Quantity: </b>{product.quantity}</p>
            <p grid-area='recievedon'><b>Recieved On: </b>{product['recieved on']}</p>

        </div>
      </div>
    )
  };

  //function called on modal submit
  async function handleFormSubmit(values) {
    //so backend knows which product to edit
    values.id = product.idproducts;
    values.extra_id = product.extra_id;
    values.paid = product.paid;

    //closes modal
    setShowModal(false);

    //backend call to db to update product then rerenders productcards 
    await editProduct(values, dispatch, navigate)
      .then(setReRender(true));
  };

  //logic for delete button
  async function handleDelete() {
    const productId = product.idproducts;

    await deleteProduct(productId, dispatch, navigate)
      .then(() => {
        //closes modal
        setShowModal(false)
        //re renders product cards
        setReRender(true);
      });
  }

  return (
    <>
      <Header />
      {displayProduct()}
      {showModal && (
        <div className="modal-backdrop">
          <div id="modal">
            <h5>Edit Product</h5>
            <Formik
            // Sets the values of form
              initialValues={{ 
                name: product.name, 
                shape: product.shape, 
                size: product.size,
                'recieved on': product['recieved on'],
                quantity: product.quantity,
                status: product.status,
                job_id: product.job_id
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
      <div className="container">
        <button className="btn btn-dark mt-4" onClick={() => {
          navigate('/', {replace: true});
        }}>Submit</button>
      </div>
    </>
  )
};

export default Preview;