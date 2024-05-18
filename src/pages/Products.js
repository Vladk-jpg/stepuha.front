import React, { Component } from 'react';
import ProductList from '../components/ProductList';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders:[],
            products: [
                {
                    id: 1,
                    picture: './img/courseWork.jpg',
                    name: 'Курсовая работа',
                    price: '49.43'
                },
                {
                    id: 2,
                    picture: './img/labWork.jpg',
                    name: 'Лаба по оаипу',
                    price: '10.00'
                },
                {
                    id: 3,
                    picture: './img/labWorkProg.jpg',
                    name: 'Лаба по проге',
                    price: '5.00'
                },
                {
                    id: 4,
                    picture: './img/moon.jpg',
                    name: 'Луна',
                    price: '9999.99'
                },
                {
                    id: 5,
                    picture: './img/tovar.jpg',
                    name: 'tovar',
                    price: '0.00'
                },
                {
                    id: 6,
                    picture: './img/tovar.jpg',
                    name: 'tovar',
                    price: '0.00'
                }

            ],
            loading: true,
            error: null
        };
        this.addToOrder = this.addToOrder.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:8080/api/goods/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            this.setState({ products: data, loading: false });
        } catch (error) {
            this.setState({ error: error, loading: false });
        }
    };

    render() {
        const { products, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // }

        return <ProductList products={products} onAdd = {this.addToOrder}/>;
    }

    addToOrder(product) {
        this.setState((prevState, props) => {
            const orders = [...props.orders];
            const isInArray = orders.some(el => el.id === product.id);
            if (!isInArray) {
                const updatedOrders = [...orders, product];
                return { orders: updatedOrders };
            }
            return null;

        }, () => {
            this.props.setOrders(this.state.orders);
        });
    }

}

export default Products;