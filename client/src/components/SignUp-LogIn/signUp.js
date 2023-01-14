import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../actions';
import { useState } from 'react';


const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});


const SignUp = () => {



  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(userSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    dispatch(signUp(e, () => {
      navigate("/", { replace: true });
    }))
  }

  const [error, setError] = useState(null);

  return(
    <div className='row mt-5 pt-5 '>
    <div className="offset-4 col-md-3">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='form-group row col-8 offset-md-2 mt-2'>
          <label>Email</label>
          <input
            className='form-control '
            {...register('email', {required: true})}>
          </input>
            {errors.email?.message}
        </div>
        <div className="form-group row col-8 offset-md-2">
          <label>Password</label>
          <input 
            className="form-control"
            {...register('password', {required: true})}></input>
            {errors.password?.message}
        </div>

        <button className="btn btn-outline-secondary mt-2 offset-md-2 mb-2" type="submit">Submit</button>
        {this.state.error && <p>{this.state.error}</p>}
      </form>
    </div>
  </div>  
  )
};


export default SignUp