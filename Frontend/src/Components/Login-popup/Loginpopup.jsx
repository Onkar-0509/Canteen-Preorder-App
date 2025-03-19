import React, { useState, useContext } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const Loginpopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Sign Up');
  const { setToken, URL } = useContext(StoreContext);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const url = URL + '/api/user';
  const onLogin = async (event) => {
    event.preventDefault();

    if (!isChecked) {
      alert('Please agree to the Privacy Policy before continuing.');
      return;
    }

    let newUrl = currState === 'Login' ? `${url}/login` : `${url}/register`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
        toast.success(currState === 'Login' ? 'Login successfully!!!' : 'Sign-up successfully!!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='login-popup absolute z-[1] w-[100%] h-[100%] grid bg-[#00000090]'>
      <form
        onSubmit={onLogin}
        className='login-popup-container place-self-center w-[max(23vw,330px)] text-gray-500 bg-white flex flex-col gap-6 p-[25px_30px] rounded-lg text-sm animate-[fadeIn_0.5s] '
      >
        <div className='login-popup-title flex justify-between items-center text-black text-[19px] font-semibold'>
          <p className='text-center'>{currState}</p>
          <img
            className='w-[16px] cursor-pointer'
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=''
          />
        </div>

        <div className='login-popup-inputs flex flex-col gap-5'>
          {currState === 'Login' ? null : (
            <input
              onChange={onChangeHandler}
              className='border border-[#c9c9c9] p-[10px] rounded-[4px] outline-none'
              name='name'
              value={data.name}
              type='text'
              placeholder='Your Name'
              required
            />
          )}

          <input
            onChange={onChangeHandler}
            className='border border-[#c9c9c9] p-[10px] rounded-[4px] outline-none'
            name='email'
            value={data.email}
            type='text'
            placeholder='Email'
            required
          />
          <input
            onChange={onChangeHandler}
            className='border border-[#c9c9c9] p-[10px] rounded-[4px] outline-none'
            name='password'
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>

       

        <button
          type='submit'
          className={`text-white bg-red-500 font-[15px] p-[10px] ${
            !isChecked ? 'cursor-not-allowed' : ''
          }`}
          disabled={!isChecked}
        >
          {currState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <div className='login-popup-condition flex gap-2 items-center mt-[-15px]'>
          <input
            type='checkbox'
            className='checkbox'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <p>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
        </div>

        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span className='cursor-pointer text-red-500 font-medium' onClick={() => setCurrState('Sign Up')}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account{' '}
            <span className='cursor-pointer text-red-500 font-medium' onClick={() => setCurrState('Login')}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
