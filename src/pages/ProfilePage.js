import React, {Component} from "react";
import MyProductList from "../components/MyProductsList";
import EditProductForm from "../components/EditProductForm";
import AddProductForm from "../components/AddProductForm";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Username',
            name: 'Name',
            surname: 'Surname',
            teacher: 'Teacher',
            products: [],
            loading: true,
            error: null,
            editingProduct: null
        };
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
                throw new Error('Вы не вошли в систему');
            }

            const result = await response.json();
            const data = result.data;
            this.setState({products: data, loading: false});
        } catch (error) {
            this.setState({error: error, loading: false});
        }
    };

    onDelete = async (productId) => {
        const token = localStorage.getItem("accessToken");
        const url = `http://localhost:8080/api/goods/${productId}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Успешное удаление
            console.log(`Product with id ${productId} deleted successfully`);

            // Обновите состояние, удалив продукт из списка
            this.props.onDeleteOrder(productId)
            this.setState((prevState) => ({
                products: prevState.products.filter(product => product.id !== productId)
            }));
        } catch (error) {
            console.error("There was a problem with the DELETE request:", error);
        }
    };

    showEditForm = (product) => {
        this.setState({ editingProduct: product });
    };

    hideEditForm = () => {
        this.setState({ editingProduct: null });
    };

    onUpdate = async (updatedProduct) => {
        const token = localStorage.getItem("accessToken");
        const url = `http://localhost:8080/api/goods/${updatedProduct.id}`;

        // Создаем новый объект, исключая поле изображения
        const { picture, ...productWithoutImage } = updatedProduct;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productWithoutImage)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log(result.data);

            // Обновите состояние, заменив измененный продукт в списке продуктов
            this.setState((prevState) => ({
                products: prevState.products.map(product =>
                    product.id === updatedProduct.id ? result : product
                )
            }));
        } catch (error) {
            console.error("There was a problem with the PUT request:", error);
        }
    };

    onAdd = async (newProduct) => {
        const token = localStorage.getItem('accessToken');
        const url = 'http://localhost:8080/api/goods/';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            this.fetchProducts();
        } catch (error) {
            console.error('There was a problem with the POST request:', error);
        }
    };

    render() {
        const {products, loading, error, editingProduct} = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                <div className='info-container'>
                    <h1>Общая информация:</h1>
                    <div className='info-item'>
                        <p>Никнейм: {this.state.username}</p>
                        <p>Имя: {this.state.name}</p>
                        <p>Фамилия: {this.state.surname}</p>
                        <p>Любимый преподаватель: {this.state.teacher}</p>
                        <button className="change-button">Изменить профиль</button>
                    </div>
                </div>
                <MyProductList products={products}
                               onDelete={this.onDelete}
                               onUpdate={this.onUpdate}
                               showEditForm={this.showEditForm}/>
                <AddProductForm onAdd={this.onAdd} />
                {editingProduct && (
                    <EditProductForm
                        product={editingProduct}
                        onUpdate={this.onUpdate}
                        onCancel={this.hideEditForm}
                    />
                )}
            </div>
        )
    }
}

export default ProfilePage;