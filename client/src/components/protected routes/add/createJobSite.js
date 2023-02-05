import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import AuthContext from '../../auth/authProvider';
import { createJobsite } from '../../../actions';
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

  //hacky fix so /confirm can know whether to retrieve product or jobsite
  const { setReRender } = useContext(AuthContext);

  const handleFormSubmit = async(data, event) => {
    event.preventDefault();

    function callback() {
      navigate('/', {replace: true});
    };

    //hacky fix that lets /confirm what data to retrieve
    setReRender('jobsites');

    //backend call awaiting status from backend
    return createJobsite(data, dispatch, navigate, callback);
  };

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