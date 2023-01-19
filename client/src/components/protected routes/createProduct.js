import Header from "../header";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { UNSAFE_DataRouterStateContext, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import AuthContext from "../auth/authProvider";
import { createProduct } from "../../actions";


//yup setup
const userSchema = Yup.object().shape({
  name: Yup.string().required('This is a required field'),
  shape: Yup.string().required('This is a required field'),
  size: Yup.string().required('This is a required field'),
  'recieved on': Yup.string().required('This is a required field'),
  quantity: Yup.number('Has to be a number').required('This is a required field'),
  extra_id: Yup.string(),
  status: Yup.string().required('This is a required field'),
  job_id: Yup.string().required('This is a required field'),
  paid: Yup.string().required('This is a required field'),
  'picked up': Yup.string()
});


const CreateProduct = () => {
  //so axios can use dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const { updateAuth, auth } = useContext(AuthContext);

  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(userSchema)
  });

  const handleFormSubmit = async(data, event) => {
    event.preventDefault();

    if(data['picked up'] === '') {
      data['picked up'] = null
    };

    //prevent expired token users from submitting
    if(!auth) {
      return navigate('/', {replace: true});
    };

    //backend call w await so status can be handled
    const submitResult = await createProduct(data);

    if (submitResult === 201) {
      console.log('success');
    } else {
      console.log(submitResult);
    };
  };
  return (
    <>
      <div className="container add-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h3>Add Product to Inventory</h3>
          <div>
            <label>Name:</label>
            <input className="input-field" placeholder="'pvc pipes'"
            {...register('name', {required: true})} />
            <p className="yup-errors">{errors.name?.message}</p>

            <label>Recieved On:</label>
            <input type="date" className="input-field" datepicker='datepicker' 
            {...register('recieved on', {required: true})} />
            <p className="yup-errors">{errors.recieved_on?.message}</p>

            <label>Shape:</label>
            <input className="input-field" placeholder="'cube'"
            {...register('shape', {required: true})} />
            <p className="yup-errors">{errors.shape?.message}</p>

            <label>Size:</label>
            <input className="input-field" placeholder="'3'x5'x10''"
            {...register('size', {required: true})} />
            <p className="yup-errors">{errors.size?.message}</p>

            <label>Quantity:</label>
            <input className="input-field" placeholder="'45'"
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

            {/* GRAB all jobs from table and render them here */}
            <label>Job:</label>
            <select {...register('job_id', {required: true})}
            className='input-field'>
              <option value="0">dummy data</option>
              <option value="1">idk what to put</option>
            </select>
            <p className="yup-errors">{errors.job_id?.message}</p>

            <label>Paid:</label>
            <select {...register('paid', {required: true})}
            className='input-field'>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
            <p className="yup-errors">{errors.paid?.message}</p>

            <p><em>optional </em></p>
            <label>Extra:</label>
            <select {...register('extra_id')}
            className='input-field'>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
            <p className="yup-errors">{errors.extra?.message}</p>
            
            <p><em>optional </em></p>
            <label>Picked Up:</label>
            <input type="date" className="input-field" datepicker='datepicker' 
            {...register('picked up')} />
            <p className="yup-errors">{errors.picked_up?.message}</p>
          </div>
          <button type="submit" className="btn btn-dark">Create</button>
        </form>
      </div>
    </>
  )
};


export default CreateProduct;