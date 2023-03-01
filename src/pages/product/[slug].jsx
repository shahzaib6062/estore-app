import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import data from 'utils/Data';
import Link from 'next/link';
import Image from 'next/image';
import { store } from 'utils/Store';

export default function ProductScreen() {
  const { state, dispatch } = useContext(store);
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  const addToCardHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert('Sorry! the product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/Cart');
  };
  if (!product) {
    return (
      <Layout>
        <h1>Product not fount</h1>
      </Layout>
    );
  } else {
    return (
      <Layout title={product.title}>
        <Link href="/">back to products</Link>
        <div className="grid md:col-span-4 md:gap-3">
          <div className="md:col-span-3">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              Layout="responsive"
            ></Image>
          </div>
          <div>
            <ul>
              <li>
                <h1 className="text-lg">{product.name}</h1>
              </li>
              <li>Catagory: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>
                {product.rating} of {product.numReviews} reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div className="card p-5">
            <div className="mb-5 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-5 flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? 'In stock' : 'Not in stock'}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCardHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}
