// src/ProductDetail.js

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import images from './imageImports';

const ProductDetail = () => {
    const { id } = useParams();
    const imagePath = images[id];

    useEffect(() => {
        window.print();
        window.onafterprint = window.close;
    }, []);

    return (
        <div>
            {imagePath ? (
                <img src={imagePath} alt={`Продукт ${id}`} />
            ) : (
                <p>Изображение не найдено</p>
            )}
        </div>
    );
};

export default ProductDetail;
