import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogIn } from '../../actions';
import { useEffect, useState } from 'react';
import Header from '../header';
import useValidation from '../validation-hook';


//yup schema
const userSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
});

const LogIn = () => {
  const [error, setError] = useState(null);
  const [onLoad, setOnLoad] = useState(false);

  //basic yup setup
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(userSchema)
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();



  //checks user auth w hook only once window loads
  // useEffect(() => {
  //   console.log('got here')
  //   setTimeout(function () {
  //     setOnLoad(true);
  //   }, 1000)
  // }, []);

  // while(onLoad === true) {
  //   console.log('ghawef')
  //   let authCheck = useValidation();
  //   if(authCheck) return navigate('/', {replace: true})
  // }



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

  //showing password
  const handlePassword = (e) => {
    e.preventDefault();
    const password = document.getElementById('password');
    const img = document.getElementById('img');

    //correctly swich password and eye on seen and unseen
    if(password.type === 'password') {
      password.setAttribute('type', 'text');
      img.setAttribute('src', 'https://i.stack.imgur.com/waw4z.png');
    } else {
      password.setAttribute('type', 'password');
      img.setAttribute('src', 'https://i.stack.imgur.com/Oyk1g.png');
    }
  }

  
  return (
    <div>
      <Header />
      <div className="auth-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className=''>
            <label>Email</label>
            <input
              className='input-field'
              {...register('email', {required: true})}>
            </input>
            <p>{errors.email?.message}</p>
          </div>

          <label>Password</label>
          <div id='' className="password-container">
            <input 
              className="input-field"
              {...register('password', {required: true})}
              type="password" id='password'></input>
            <button type='button' className="show-password" onClick={(e) => handlePassword(e)}>
              <img src="https://i.stack.imgur.com/Oyk1g.png" id="img"/>
            </button>
          </div>
          <p>{errors.password?.message}</p>
          <button className="btn btn-dark" type="submit">Submit</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LogIn;