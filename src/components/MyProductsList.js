import React, {Component} from 'react';
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";

class MyProductList extends Component {
    render() {
        const {products, onDelete, showEditForm} = this.props;

        if (!Array.isArray(products)) {
            return <div>У вас пока нет товаров, но вы можете их добавить</div>;
        }
        return (
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <img src={`http://localhost:8080/img/${product.id}/${product.picture}`} alt={product.name} />
                        <h2>{product.name}</h2>
                        <b>{product.description}</b>
                        <p>{product.price} @</p>
                        <FaEdit className="edit-my-good" onClick={() => showEditForm(product)}/>
                        <HiTrash className='delete-my-good' onClick={() => onDelete(product.id)}/>
                    </div>
                ))}
            </div>
        );
    }
}

export default MyProductList;