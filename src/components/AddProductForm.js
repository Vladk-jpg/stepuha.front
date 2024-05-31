import React, { Component } from "react";

class AddProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            picture: null,
            description: ''
        };
    }

    handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "picture") {
            this.setState({ picture: files[0] });
        } else {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, price, picture, description } = this.state;

        const product = {
            name,
            price: parseFloat(price),
            picture,
            description
        };

        this.props.onAdd(product);
        this.setState({ name: '', price: '', picture: null, description: '' });
    }

    render() {
        const { name, price, description } = this.state;
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
                    min="1"
                    max="999999"
                    name="price"
                    value={price}
                    onChange={this.handleChange}
                    placeholder="Цена"
                    className="add-form-input"
                    required
                />
                <input
                    type="file"
                    name="picture"
                    onChange={this.handleChange}
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
