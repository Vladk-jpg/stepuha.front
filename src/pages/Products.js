import React, {Component} from 'react';
import ProductList from '../components/ProductList';
import ProductDetail from "../components/ProductDetail";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProductDetails: false,
            fullProduct: {},
            orders: [],
            products: [],
            loading: true,
            error: null
        };
        this.addToOrder = this.addToOrder.bind(this);
        this.onShowProduct = this.onShowProduct.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        const token = localStorage.getItem('accessToken');
        console.log(token);
        try {
            const response = await fetch('http://localhost:8080/api/supp/rnd', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Чтобы увидеть товары, пожалуйста войдите в систему');
            }

            const result = await response.json();
            const data = result.data;
            this.setState({products: data, loading: false});
        } catch (error) {
            this.setState({error: error, loading: false});
        }
    };

    render() {
        const {products, loading, error} = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                <ProductList onShowProduct={this.onShowProduct} products={products} onAdd={this.addToOrder}/>
                {this.state.showProductDetails &&
                    <ProductDetail product={this.state.fullProduct} onAdd={this.addToOrder}
                                   onShowProduct={this.onShowProduct}/>}
            </div>
        );
    }

    onShowProduct(product) {
        this.setState({fullProduct: product})
        this.setState({showProductDetails: !this.state.showProductDetails});
    }

    addToOrder(product) {
        this.setState({orders: this.props.orders})
        this.setState((prevState) => {
            const isInArray = prevState.orders.some(el => el.id === product.id);
            if (!isInArray) {
                const updatedOrders = [...prevState.orders, product];
                return { orders: updatedOrders };
            }
            return null;
        }, () => {
            if (this.props.setOrders) {
                this.props.setOrders(this.state.orders);
            }
        });
    }

}

export default Products;