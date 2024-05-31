import React, {Component} from "react";
import UploadImage from "./UploadImage";

class EditProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.product,
            price: props.product.price.toString()
        };
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const updatedProduct = {
            ...this.state,
            price: parseFloat(this.state.price),
        };
        delete updatedProduct['picture']
        this.props.onUpdate(updatedProduct)
    }



    render() {
        const {onCancel} = this.props

        return (
            <div className="edit-product-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                        />
                        <label>Price</label>
                        <input
                            type="number"
                            min="1"
                            max="999999"
                            name="price"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <UploadImage id={this.props.product.id} product={this.props.product} />
                    </div>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onCancel}>
                        Закрыть
                    </button>
                </form>
            </div>
        );
    }
}

export default EditProductForm;
