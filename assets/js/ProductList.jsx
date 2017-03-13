import React from 'react';
import ReactDOM from 'react-dom';

class ProductList extends React.Component {
    render() {
        return(
            <div>
                <h4>Product Information:</h4>
                <ul>
                  <li>List of fetaures: {_appData.features}</li>
                  <li>Price: {_appData.price}</li>
                </ul>
            </div>
        );
    }
}
export default ProductList;