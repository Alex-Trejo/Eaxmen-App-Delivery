import React, { createContext, useState } from 'react';

const ProductContext = createContext();

const initialProducts = [
    {
        id: '1',
        name: 'Encebollado',
        description: 'Con cola y pan',
        price: 5.0,
        image: require('../assets/encebollado.png'),
        status: 'disponible',
    },
    {
        id: '2',
        name: 'Hamburguesa',
        description: 'Con queso y papas',
        price: 6.0,
        image: require('../assets/fastFood.jpeg'),
        status: 'disponible',
    },
    {
        id: '3',
        name: 'Mariscos',
        description: 'Con queso y papas',
        price: 16.0,
        image: require('../assets/combos.jpg'),
        status: 'deshabilitado',
    },
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);

    const addProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        console.log(`Producto añadido: ${newProduct.name}`);
    };

    const toggleProductStatus = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === id) {
                    const updatedStatus = product.status === 'disponible' ? 'deshabilitado' : 'disponible';
                    console.log(`El estado del producto ${product.name} ha cambiado a ${updatedStatus}`);
                    return { ...product, status: updatedStatus };
                }
                return product;
            })
        );
    };

    const removeProduct = (productId) => {
        setProducts((prevProducts) => {
            const productToRemove = prevProducts.find((product) => product.id === productId);
            if (productToRemove) {
                console.log(`El producto ${productToRemove.name} ha sido eliminado`);
            }
            return prevProducts.filter((product) => product.id !== productId);
        });
    };

    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
            )
        );
    };

    return (
        <ProductContext.Provider
            value={{ products, addProduct, toggleProductStatus, removeProduct, updateProduct }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
