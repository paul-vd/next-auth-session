import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import styles from './header.module.css';
import { useLoginModal } from '../hooks/useLoginModal';
import { Button } from 'antd';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();
  const [signIn, context] = useLoginModal();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <div className="flex justify-between">
              <div>You are not signed in</div>
              <Button
                type="primary"
                onClick={() => {
                  signIn();
                }}
              >
                Sign in
              </Button>
            </div>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/client">
              <a>Client</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server">
              <a>Server</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">
              <a>Protected</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">
              <a>API</a>
            </Link>
          </li>
        </ul>
      </nav>
      {context}
    </header>
  );
}
