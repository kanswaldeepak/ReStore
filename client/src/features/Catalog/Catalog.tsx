import { Product } from '../../app/models/product';
import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect, useState } from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import agent from '../../app/api/agent';

// interface Props {
//     products: Product[];
//     addProduct: () => void;
// }

export default function Catalog() {
    

const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  agent.Catalog.list()
  .then(products => setProducts(products))
  .catch(response => console.log(response))
  .finally(()=> setLoading(false))

  // fetch('http://localhost:5098/api/products')
  //   .then(response => response.json())
  //   .then(data => setProducts(data))
}, []);

if (loading) return <LoadingComponent message='Loading Products....' />

// function addProduct() {
//   setProducts(prevState => [...prevState,
//   {
//     id: prevState.length + 101,
//     name: 'product' + (prevState.length + 1),
//     description: 'Test Description',
//     price: (prevState.length * 100) + 100,
//     pictureUrl: 'http://picsum.photos/200',
//     brand: 'Brand' + prevState.length,
//     publicId: 'public' + prevState.length
//   }])
// }

    return (
        <>
            <ProductList products={products}/>
            {/* <Button variant="contained" onClick={addProduct}>Add Products</Button> */}
        </>
    )
}