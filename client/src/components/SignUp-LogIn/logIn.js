import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogIn, handleSignup } from '../../actions';
import { useState } from 'react';

//yup schema
const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

const LogIn = () => {
  const [error, setError] = useState(null);

    //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(userSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

    //async so it can wait on axios call 
    const handleFormSubmit = async (data, event) => {
      event.preventDefault();

      //handleLogIn action returns values of backend call
      const logInResult = await handleLogIn(data, dispatch);

      if(logInResult === 201) {
        return navigate("/", { replace: true });
  
      } else if(logInResult === 401) {
        return setError('Incorrect email or password');
  
      } else {
        return setError('An unexpected error occured');
      };
    }
  return (
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

          <div id='password-container' className="form-group row col-8 offset-md-2 d-flex ">
            <label>Password</label>
            <input 
              className="form-control mr-2"
              {...register('password', {required: true})}
              type="password" id='password'></input>
            <button>
              <img src="https://i.stack.imgur.com/Oyk1g.png" id="EYE"/>
            </button>
            
          </div>
          <button className="btn btn-outline-secondary mt-2 offset-md-2 mb-2" type="submit">Submit</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div> 
  );
}

export default LogIn;