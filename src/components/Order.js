import React, {Component} from "react"
import { HiTrash } from "react-icons/hi2";

export class Order extends Component{
    render() {
        return(
            <div className="cart-item">
                <img src={this.props.product.picture} alt={this.props.product.name}/>
                <h2>{this.props.product.name}</h2>
                <p>{this.props.product.price} руб.</p>
                <HiTrash className="delete-icon" onClick={() => this.props.onDelete(this.props.product.id)}/>
                <button className="buy-button">Купить</button>
            </div>
        )
    }
}

export default Order