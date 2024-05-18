import React, {Component} from "react";

export class ProductDetail extends Component {
    render() {
        return (
            <div className='product-details'>
                <div>
                    <img src={this.props.product.picture} alt={this.props.product.name}
                         onClick={() => this.props.onShowProduct(this.props.product)}/>
                    <h2>{this.props.product.name}</h2>
                    <b>{this.props.product.description}</b>
                    <p>{this.props.product.price} руб.</p>
                    <div className={'add-to-cart'} onClick={() => this.props.onAdd(this.props.product)}>+</div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;