import React, { Component } from "react";

class AddProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            picture: '',
            description: ''
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, price, picture, description } = this.state;

        // Преобразование цены в число
        const product = {
            name,
            price: parseFloat(price),
            picture,
            description
        };

        this.props.onAdd(product);
        this.setState({ name: '', price: '', picture: '', description: '' }); // Очистка полей после отправки
    }

    render() {
        const { name, price, picture, description } = this.state;
        return (
            <form className="add-form-container" onSubmit={this.handleSubmit}>
                <h2 className="add-form-title">Добавить новый товар</h2>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    placeholder="Название"
                    className="add-form-input"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={this.handleChange}
                    placeholder="Цена"
                    className="add-form-input"
                    required
                />
                <input
                    type="text"
                    name="picture"
                    value={picture}
                    onChange={this.handleChange}
                    placeholder="URL изображения"
                    className="add-form-input"
                    required
                />
                <textarea
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    placeholder="Описание"
                    className="add-form-textarea"
                    required
                />
                <button type="submit" className="add-form-button">Добавить товар</button>
            </form>
        );
    }
}

export default AddProductForm;
