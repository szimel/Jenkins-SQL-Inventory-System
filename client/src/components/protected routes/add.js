import Header from "../header";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const userSchema = Yup.object().shape({
  name: Yup.string().required(),
  shape: Yup.string().required(),
  size: Yup.string().required(),
  recieved_on: Yup.date().required(),
  quanitity: Yup.number().required(),
  extra: Yup.string(),
  status: Yup.string().required(),
  job_id: Yup.string().required(),
  paid: Yup.string().required(),
  picked_up: Yup.date()
});


const Add = () => {
  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(userSchema)
  });

  function handleFormSubmit() {
    return null;
  }
  return (
    <>
      <Header />
      <div className="container add-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h3>Add Product to Inventory</h3>
          <div>
            <label>Name:</label>
            <input className="input-field" placeholder="'pvc pipes'"
            {...register('name', {required: true})} />

            <label>Recieved On:</label>
            <input type="date" className="input-field" datepicker='datepicker' 
            {...register('recieved_on', {required: true})} />

            <label>Shape:</label>
            <input className="input-field" placeholder="'cube'"
            {...register('shape', {required: true})} />

            <label>Size:</label>
            <input className="input-field" placeholder="'3'x5'x10''"
            {...register('size', {required: true})} />

            <label>Quantity:</label>
            <input className="input-field" placeholder="'45'"
            {...register('quantity', {required: true})} />

            <label>Status:</label>
            <select {...register('status', {required: true})}
            className='input-field'>
              <option value="shipping">To Be Delivered</option>
              <option value="warehouse">At Warehouse</option>
              <option value='jobSite'>At Job Site</option>
            </select>

            {/* GRAB all jobs from table and render them here */}
            <label>Job:</label>
            <select {...register('job_id', {required: true})}
            className='input-field'>
              <option value="manchak">dummy data</option>
              <option value="1778 oakdale">idk what to put</option>
            </select>

            <label>Paid:</label>
            <select {...register('paid', {required: true})}
            className='input-field'>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <p><em>optional </em></p>
            <label>Extra:</label>
            <select {...register('extra')}
            className='input-field'>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            
            <p><em>optional </em></p>
            <label>Picked Up:</label>
            <input type="date" className="input-field" datepicker='datepicker' 
            {...register('picked_up')} />

          </div>
        </form>
      </div>
    </>
  )
};


export default Add;