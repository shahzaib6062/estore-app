import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { store } from 'utils/Store';

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(store);
  const { cart } = state;
  return (
    <div>
      <Head>
        <title>{title ? title + '- estore' : 'EStore'}</title>
        <meta name="description" content="EStore App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href="/" className="text-lg font-bold">
              EStore
            </Link>
            <div>
              <Link href="/Cart" className="p-2">
                Cart
                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {cart.cartItems.length > 0 &&
                    cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>

        <main className="cotainer mt-4 px-4">{children}</main>
        <footer className="flex justify-between h-10 mx-auto shadow-inner">
          <p>copyright ©️ 2023 EStore</p>
        </footer>
      </div>
    </div>
  );
}
