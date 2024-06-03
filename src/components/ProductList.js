import React, {Component} from 'react';

class ProductList extends Component {
    render() {
        const {products} = this.props;

        if (!Array.isArray(products)) {
            return <div>Нет товаров</div>;
        }

        return (
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={"http://localhost:8080/img/" + product.id + "/" + product.picture} alt={product.name} onClick={() => this.props.onShowProduct(product)} />
                        <h2>{product.name}</h2>
                        <p>{product.price} @</p>
                        <div className={'add-to-cart'} onClick={() => this.props.onAdd(product)}>+</div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ProductList;