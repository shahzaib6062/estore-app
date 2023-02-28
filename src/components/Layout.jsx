import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
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
              <Link href="/cart" className="p-2">
                Cart
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>

        <main className="cotainer m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-between h-10 mx-auto shadow-inner">
          <p>copyright ©️ 2023 EStore</p>
        </footer>
      </div>
    </div>
  );
}
