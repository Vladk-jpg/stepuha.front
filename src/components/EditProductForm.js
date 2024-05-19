import React, { Component } from "react";

class EditProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.product,
            price: props.product.price.toString()
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = {
            ...this.state,
            price: parseFloat(this.state.price) // Преобразуем цену обратно в число
        };
        this.props.onUpdate(updatedProduct);
    };

    render() {
        const { name, description, price } = this.state;
        const { onCancel } = this.props;

        return (
            <div className="edit-product-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="Название"
                            value={name}
                            onChange={this.handleChange}
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            name="Описание"
                            value={description}
                            onChange={this.handleChange}
                        />
                        <label>Price</label>
                        <input
                            type="text"
                            name="Цена"
                            value={price}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onCancel}>
                        Отмена
                    </button>
                </form>
            </div>
        );
    }
}

export default EditProductForm;
