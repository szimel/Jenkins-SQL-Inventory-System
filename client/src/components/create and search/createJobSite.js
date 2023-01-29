import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import AuthContext from '../auth/authProvider';
import { createJobsite } from '../../actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const jobSchema = Yup.object().shape({
  name: Yup.string().max(89).required('This is a required field'),
  active: Yup.string().required('This is a required field'),
});

const CreateJobSite = () => {
  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(jobSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //so user auth can be checked before submit
  const { updateAuth, auth } = useContext(AuthContext);

  const handleFormSubmit = async(data, event) => {
    event.preventDefault();

    //prevent expired token users from submitting
    updateAuth('');
    if(!auth) {
      return navigate('/', {replace: true});
    };

    //backend call awaiting status from backend
    const submitResult = await createJobsite(data, dispatch, navigate);

    //what to do w status
    if (submitResult === 200) {
      console.log('success');
    } else {
      console.log(submitResult);
    };
  }

  return (
    <>
      <div className="container add-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h3>Add Jobsite</h3>

          <label>Name:</label>
          <input className="input-field" placeholder="'manchak'"
          {...register('name', {required: true})} />
          <p className="yup-errors">{errors.name?.message}</p>

          <label>Active:</label>
            <select {...register('active', {required: true})}
            className='input-field'>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <p className="yup-errors">{errors.active?.message}</p>

            <button type="submit" className="btn btn-dark">Create</button>
        </form>
      </div>
    </>
  );
};

export default CreateJobSite;