import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import data from 'utils/Data';

export default function Home() {
  return (
    <>
      <Layout>
        <div className="grid gap-4 grid-cols-1 md:grid-col-3 lg:grid-cols-4">
          {data.products.map((product) => {
            return <ProductItem product={product} key={product.slug} />;
          })}
        </div>
      </Layout>
    </>
  );
}
