import React, {Component} from "react";

export class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isButton: true
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
            this.setState({username: userData.username});
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    freezeUser = async () => {
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

            const userResponse = await fetch(`http://localhost:8080/api/mod/freeze/${ownerId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!userResponse.ok) {
                throw new Error('Network response was not ok');
            }
            this.setState({isButton: false});

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    onDelete = async () => {
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

            const DeleteGood = await fetch(`http://localhost:8080/api/mod/${ownerId}/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!DeleteGood.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedProducts = this.props.products.filter(product => product.id !== productId);
            this.props.setProducts(updatedProducts);
            this.props.onShowProduct(this.props.product);

        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    render() {
        return (
            <div className='product-details'>
                <div>
                    <img src={`http://localhost:8080/img/${this.props.product.id}/${this.props.product.picture}`}
                         alt={this.props.product.name}
                         onClick={() => this.props.onShowProduct(this.props.product)}/>
                    <h2>{this.props.product.name}</h2>
                    {this.state.username && <b>Продавец: {this.state.username}</b>}
                    <p/>
                    <b>{this.props.product.description}</b>
                    <p>{this.props.product.price} @</p>
                    {this.state.isButton && this.props.isModer && (
                        <button onClick={() => this.freezeUser()}>Заблокировать пользователя</button>
                    )}
                    {this.props.isModer && (
                        <button onClick={() => this.onDelete()}>Удалить товар</button>
                    )}
                    <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.product)}>+</div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
