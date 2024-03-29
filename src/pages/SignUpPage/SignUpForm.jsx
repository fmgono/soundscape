import React, { useState, useId } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classes from './SignUpForm.module.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const id = useId();

  const registerUser = async (data) => {
    try {
      setIsLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredentials.user;
      await updateProfile(user, {
        displayName: data.username,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/soundscape-slson.appspot.com/o/defaulpfp.png?alt=media&token=9eade07b-673d-46c6-93b9-a4fe69c9c624`,
      });

      addDoc(collection(db, 'users'), {
        username: user.displayName,
        userId: user.uid,
        pfp: user.photoURL,
        email: user.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <main className={classes.main}>
      <div className={classes.main__textbox}>
        <h1 className={classes.main__title}>Create your account</h1>
      </div>

      <form action="submit" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form__group}>
          <label htmlFor={`${id}-username`} className={classes.form__label}>
            Username
          </label>
          <input
            {...register('username', {
              required: { value: true, message: 'Username is required' },
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Username must be at most 20 characters long',
              },
              pattern: {
                value: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
                message: 'Username must only contain letters and numbers',
              },
            })}
            id={`${id}-username`}
            className={`${classes.form__input} ${errors.username && classes.error}`}
            placeholder="Choose your username"
          />
          {errors.username && <p className={classes.form__error}>{errors.username.message}</p>}
        </div>

        <div className={classes.form__group}>
          <label htmlFor={`${id}-email`} className={classes.form__label}>
            Email
          </label>
          <input
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            id={`${id}-email`}
            className={`${classes.form__input} ${errors.email && classes.error}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className={classes.form__error}>{errors.email.message}</p>}
        </div>

        <div className={classes.form__group}>
          <label htmlFor={`${id}-password`} className={classes.form__label}>
            Password
          </label>
          <input
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
                message: 'Password must contain at least a uppercase letter and a number',
              },
            })}
            type="password"
            id={`${id}-password`}
            className={`${classes.form__input} ${errors.password && classes.error}`}
            placeholder="Create a password"
          />
          {errors.password && <p className={classes.form__error}>{errors.password.message}</p>}
        </div>

        <p className={classes.form__paragraph}>
          By signing up, you agree to the{' '}
          <Link to="/" className={classes['form__link-secondary']}>
            soundscape
          </Link>{' '}
          Terms of Service and Privacy Policy.
        </p>
        <button className={classes.btn}>
          {isLoading ? (
            <PropagateLoader
              color="#f2f2f2"
              size={15}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          ) : (
            'Continue'
          )}
        </button>
        <Link to="/signin" className={classes.form__link}>
          Already have an account?
        </Link>
      </form>
    </main>
  );
};

export default SignUpForm;
