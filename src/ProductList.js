// src/ProductList.js

import React, { useState, useEffect } from 'react';
import { Input, List, Spin, Card } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Search } = Input;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://greenman.kz/api/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Список продуктов</h1> <br/><br/>
            <Search
                placeholder="Поиск по названию"
                allowClear
                enterButton="Искать"
                size="large"
                onChange={handleSearch}
                style={{ marginBottom: '20px' }}
            />
            {loading ? (
                <Spin size="large" />
            ) : (
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 4,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={filteredProducts}
                    renderItem={product => (
                        <List.Item key={product.id}>
                            <Card
                                hoverable
                                style={{
                                    boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.2)',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                }}
                            >
                                <Link to={`/product/${product.id}`} style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                                    {product.name}
                                </Link>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default ProductList;
