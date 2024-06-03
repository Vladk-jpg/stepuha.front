import React, { Component } from "react";
import { HiTrash } from "react-icons/hi2";

export class Order extends Component {
    handleBuy = async () => {
        const { product, onDelete, showMessage } = this.props;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`http://localhost:8080/api/goods/buy/${product.id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const result = await response.json();
            if (result.status === "ok") {
                showMessage("Покупка успешна!", 'success');
                onDelete(product.id);
                this.props.purchaseDone()
            } else if (result.message === "user does not exist or does not have enough money") {
                showMessage("У вас недостаточно денег на балансе", 'error');
            } else {
                showMessage("Возникла неизвестная ошибка", 'error');
            }
        } catch (error) {
            showMessage("Failed to make a request", 'error');
        }
    };

    render() {
        const { product, onDelete } = this.props;

        return (
            <div className="cart-item">
                <img
                    src={`http://localhost:8080/img/${product.id}/${product.picture}`}
                    alt={product.name}
                />
                <h2>{product.name}</h2>
                <p>{product.price} @</p>
                <HiTrash className="delete-icon" onClick={() => onDelete(product.id)} />
                <button className="buy-button" onClick={this.handleBuy}>Купить</button>
            </div>
        );
    }
}

export default Order;
