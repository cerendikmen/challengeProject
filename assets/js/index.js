import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './ProductList.jsx';
import ProductForm from './ProductForm.jsx';
import '../css/frm.css';

ReactDOM.render(
    <div className="frm">
        <ProductList />
        <ProductForm url1='/purchase/check/' url2='/purchase/record/'/>
    </div>, 
    document.getElementById('container')
);