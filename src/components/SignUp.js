import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Navigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const signUpUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setRedirectToLogin(true); // Redirect to login after successful signup
    } catch (error) {
      setError('Sign Up failed. Please try again.');
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUpUser}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        Already have an account?{' '}
        <button style={{ cursor: 'pointer', color: 'blue', border: 'none', background: 'none' }} onClick={() => setRedirectToLogin(true)}>
          Log in here
        </button>
      </p>
    </div>
  );
};

export default SignUp;
