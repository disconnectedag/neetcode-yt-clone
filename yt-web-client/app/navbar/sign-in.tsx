'use client';

import React from 'react';
import styles from './sign-in.module.css';
import { signInWithGoogle, signOut } from '../firebase/firebase';
import { User } from 'firebase/auth';

interface SignInProps {
  user: User | null;
}

const SignIn = ({ user }: SignInProps) => {
  return (
    <div>
      {user ? (
        <button className={styles.signin} onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button className={styles.signin} onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default SignIn;
