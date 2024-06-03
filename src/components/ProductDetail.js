import React, { Component } from "react";

export class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }

    componentDidMount() {
        this.fetchOwnerDetails();
    }

    fetchOwnerDetails = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const productId = this.props.product.id;

            const ownerResponse = await fetch(`http://localhost:8080/api/supp/owner/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!ownerResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const ownerData = await ownerResponse.json();
            const ownerId = ownerData.id;

            const userResponse = await fetch(`http://localhost:8080/api/users/${ownerId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const userData = await userResponse.json();
            this.setState({ username: userData.username });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    render() {
        return (
            <div className='product-details'>
                <div>
                    <img src={`http://localhost:8080/img/${this.props.product.id}/${this.props.product.picture}`}
                         alt={this.props.product.name}
                         onClick={() => this.props.onShowProduct(this.props.product)} />
                    <h2>{this.props.product.name}</h2>
                    {this.state.username && <b>Продавец: {this.state.username}</b>}
                    <p />
                    <b>{this.props.product.description}</b>
                    <p>{this.props.product.price} @</p>
                    <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.product)}>+</div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
