import React, { useContext } from 'react';
import { store } from 'utils/Store';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

function CartScreen() {
  const { state, dispatch } = useContext(store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: item });
  };
  const router = useRouter();
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <div>
      <Layout title="Shopping Cart">
        <h1 className="mb-4 text-xl">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Cart is empty. <Link href="/">Go Shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3 ">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left px-5"> Item </th>
                    <th className="text-right p-5">Quantity</th>
                    <th className="text-right p-5">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr className="border-b" key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </td>
                      <td className="text-right p-5">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {console.log('count', item.countInStock)}
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-right p-5">
                        ${item.quantity * item.price}
                      </td>
                      <td>
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 text-xl">
                    Subtotal ( {cartItems.reduce((a, c) => a + c.quantity, 0)} )
                    : $(
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)})
                  </div>
                </li>
                <li>
                  <button
                    className="w-full primary-button"
                    onClick={() => router.push('/checkout')}
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
