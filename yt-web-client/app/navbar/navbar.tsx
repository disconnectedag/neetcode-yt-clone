'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './navbar.module.css';
import Link from 'next/link';
import SignIn from './sign-in';
import { onAuthStateChangedHelper } from '../firebase/firebase';
import { User } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <Image
          width={90}
          height={20}
          src="./youtube-logo.svg"
          alt="youtube logo"
        />
      </Link>
      {
        //TODO: upload button
      }
      <SignIn user={user} />
    </nav>
  );
};

export default Navbar;
