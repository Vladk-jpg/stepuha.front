import React, { Component } from 'react';
import Order from './Order';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartOpen: false
        };
    }

    toggleCart = () => {
        this.setState(prevState => ({ cartOpen: !prevState.cartOpen }));
    }

    showOrders = () => {
        return (
            <div>
                {this.props.orders.map(el => (
                    <Order
                        onDelete={this.props.onDelete}
                        key={el.id}
                        product={el}
                        showMessage={this.showMessage}
                        purchaseDone={this.purchaseDone}
                    />
                ))}
            </div>
        );
    }

    showNothing = () => {
        return (
            <div className="empty">
                <h2>Товаров нет</h2>
            </div>
        );
    }

    showMessage = (message, type) => {
        if (type === 'error') {
            toast.error(message);
        } else if (type === 'success') {
            toast.success(message);
        }
    }

    purchaseDone = () => {
        this.props.onPage('profile')
    }

    render() {
        return (
            <header>
                <div>
                    <span className={'logo'}>Stepuha.net - стипухи нет</span>
                    <ul className={'nav'}>
                        <li onClick={() => this.props.onPage('products')}>Главная</li>
                        <li onClick={() => this.props.onPage('profile')}>Кабинет</li>
                        <li onClick={() => this.props.onPage('login')}>Выйти</li>
                    </ul>
                    <button onClick={this.toggleCart}
                            className={`shop-cart-button ${this.state.cartOpen ? 'active' : ''}`}>
                        Корзина
                    </button>
                    {this.state.cartOpen && (
                        <div className={'shop-cart'}>
                            {this.props.orders.length > 0 ? this.showOrders() : this.showNothing()}
                        </div>
                    )}
                    <ToastContainer />
                </div>
            </header>
        );
    }
}

export default Header;
