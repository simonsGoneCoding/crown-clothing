import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match!');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user); //REMOVE
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      // throw error;
      if (error.code === 'auth/email-already-in-use') {
        alert('email already in use');
      } else {
        console.log('o kurwa ', error);
      }
    }
  };

  return (
    <div>
      <h1>Sing in with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        ></input>

        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        ></input>

        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        ></input>

        <label>Confirm Password</label>
        <input
          required
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
