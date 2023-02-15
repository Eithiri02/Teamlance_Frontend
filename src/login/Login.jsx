import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import Button from '@mui/material/Button';
import {
  Box,
  Typography,
} from '@mui/material';
import { history } from '_helpers';
import { authActions } from '_store';
import '../assets/styles/scss/Login.scss';
import { OverlayLoading } from '_components/_common';
import * as animationData from '../loginLottie.json'
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export { Login };

function Login() {

  const dispatch = useDispatch();
  const authUser = useSelector(x => x.auth);
  const [errorMessage, setErrorMessage] = useState("");
  const [openedOverlayLoading, setOpenedOverlayLoading] = useState(false);


  useEffect(() => {
    // redirect to home if already logged in
    if (authUser.user) history.navigate('/');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required'),
    // .min(6, 'Password must be at least 6 characters')
    // .max(40, 'Password must not exceed 40 characters'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  function onSubmit({ email, password }) {
    return dispatch(authActions.login({ email, password }));
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Box className="login-page">
      <Box className="login-box-container">
        <form className="login-form-container" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box className="login-title-container" >
            <Typography className="login-title" gutterBottom>
              Log in to Teamlance
            </Typography>
            <Typography className='login-title-1'>
              Don't have an account with us? <Link to={"/projects"}><Typography sx={{ fontWeight: 'bold', color: '#306BAC', fontSize: '14px' }}>
                Sign up here
              </Typography></Link>
            </Typography>
          </Box>
          <Box className="login-box"
            sx={{
              '& > :not(style)': { width: '100%' },
              mx: 2
            }}
            noValidate
            autoComplete="off"
          >
            <Box className="input-container">
              <Typography className="input-label">
                Email Address
              </Typography>
              <input type="text" id="email" name="email" {...register('email')} className={errors.email && 'error'} />
              <Typography className="error-message" color={errors.email ? 'error' : 'inherit'}>
                {errors.email?.message}
              </Typography>
            </Box>
            <Box className="input-container">
              <Typography className="input-label">
                Password
              </Typography>
              <input type="text" id="password" name="password" {...register('password')} className={errors.password && 'error'} />
              <Typography className="error-message" color={errors.password ? 'error' : 'inherit'}>
                {errors.password?.message}
              </Typography>
            </Box>
            {
              authUser.error && (
                <Typography className="error-message" color={'error'}>
                  {authUser.error} (eithiriaung.devit@gmail.com ,test)
                </Typography>
              )
            }
            <Box className="forgot-pwd-container">
              <FormGroup sx={{ alignItems: 'center'}}>
                <FormControlLabel PaperProps={{
                  sx: { '&.css-ahj2mt-MuiTypography-root': { fontWeight: '700 !important' } }
                }} control={<Checkbox defaultChecked />} label={<span className="input-label">Remember</span>} />
              </FormGroup>
              <Link to={"/projects"}> <Typography sx={{ fontWeight: 'bold', color: '#306BAC', fontSize: '14px' }}>
                Forget password
              </Typography></Link>
            </Box>
            <Box className="login-btn-container" display="flex" justifyContent="center">
              <Button className="login-submit-btn" type='submit'>
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Box className="login-left-side-img-container">
        <Box className="login-text-1-container">
          <Typography className="login-text-1">
            TeamLance
          </Typography>
        </Box>
        <Box className="login-text-2-container">
          <Typography className="login-text-2">
            <span><label>Build</label> your team</span>
            <span>anytime,</span>
            <span>anywhere</span>
          </Typography>
        </Box>
        <Box className="login-page-img">
          <Lottie options={defaultOptions}
            isStopped={false}
            isPaused={false} />
        </Box>
      </Box>
      {authUser.loading ? <OverlayLoading /> : null}
    </Box>
  )
}
