import { Product } from '../../app/models/product';
import { Button } from "@mui/material";
import ProductList from "./ProductList";
import { useEffect, useState } from 'react';

interface Props {
    products: Product[];
    addProduct: () => void;
}

export default function Catalog() {
    

const [products, setProducts] = useState<Product[]>([]);


useEffect(() => {
  fetch('http://localhost:5098/api/products')
    .then(response => response.json())
    .then(data => setProducts(data))
}, []);

function addProduct() {
  setProducts(prevState => [...prevState,
  {
    id: prevState.length + 101,
    name: 'product' + (prevState.length + 1),
    description: 'Test Description',
    price: (prevState.length * 100) + 100,
    pictureUrl: 'http://picsum.photos/200',
    brand: 'Brand' + prevState.length,
    publicId: 'public' + prevState.length
  }])
}

    return (
        <>
            <ProductList products={products}/>
            <Button variant="contained" onClick={addProduct}>Add Products</Button>
        </>
    )
}