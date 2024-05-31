import React, {Component} from "react";
import MyProductList from "../components/MyProductsList";
import EditProductForm from "../components/EditProductForm";
import AddProductForm from "../components/AddProductForm";
import EditUserForm from "../components/EditUserForm";
import products from "./Products";

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
            editingProduct: null,
            editingUser: false,
        };
    }

    componentDidMount() {
        this.fetchProducts()
        this.fetchUserData()
    }

    fetchUserData = async () => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:8080/api/users/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Не удалось получить данные пользователя');
            }

            const userData = await response.json()
            this.setState({
                username: userData.username,
                name: userData.name,
                surname: userData.surname,
                teacher: userData.teacher,
                loading: false,
            });
            console.log(userData)
        } catch (error) {
            this.setState({error: error.message, loading: false});
        }
    };

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

            console.log(`Product with id ${productId} deleted successfully`);

            this.props.onDeleteOrder(productId)
            this.setState((prevState) => ({
                products: prevState.products.filter(product => product.id !== productId)
            }));
        } catch (error) {
            console.error("There was a problem with the DELETE request:", error);
        }
    };

    updateUserData = async (updatedUser) => {
        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch('http://localhost:8080/api/users/', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            const result = await response.json();
            console.log('User updated successfully', result);

            this.setState({
                editingUser: false,
            });
            this.fetchUserData()
        } catch (error) {
            console.error('There was a problem with the PUT request:', error);
        }
    };

    showEditUserForm = () => {
        this.setState({editingUser: true});
    };

    hideEditUserForm = () => {
        this.setState({editingUser: false});
    };

    showEditForm = (product) => {
        this.setState({editingProduct: product});
    };

    hideEditForm = () => {
        this.setState({editingProduct: null});
    };

    onUpdate = async (updatedProduct) => {
        const token = localStorage.getItem("accessToken");
        const url = `http://localhost:8080/api/goods/${updatedProduct.id}`;

        console.log(updatedProduct)
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log(result.data);

            await this.fetchProducts()
        } catch (error) {
            console.error("There was a problem with the PUT request:", error);
        }
    };

    onAdd = async (newProduct) => {
        const token = localStorage.getItem('accessToken');
        const url = 'http://localhost:8080/api/goods/';
        console.log(newProduct);
        const picture = newProduct.picture;
        console.log(picture);
        newProduct.picture = '';

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

            await this.fetchProducts();

            setTimeout(async () => {
                const formData = new FormData();
                formData.append('picture', picture);

                const lastProduct = this.state.products[this.state.products.length - 1];
                if (lastProduct) {
                    const responsePic = await fetch(`http://localhost:8080/api/goods/picture/${lastProduct.id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: formData
                    });

                    if (!responsePic.ok) {
                        throw new Error('Failed to upload image');
                    }

                    await this.fetchProducts();
                }
            }, 100);

        } catch (error) {
            console.error('There was a problem with the POST request:', error);
        }
    };



    render() {
        const {products, loading, error, editingProduct, editingUser, username, name, surname, teacher} = this.state;

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
                        <button className="change-button" onClick={this.showEditUserForm}>Изменить профиль</button>
                    </div>
                </div>
                <MyProductList products={products}
                               onDelete={this.onDelete}
                               onUpdate={this.onUpdate}
                               showEditForm={this.showEditForm}/>
                <AddProductForm onAdd={this.onAdd}/>
                {editingProduct && (
                    <EditProductForm
                        product={editingProduct}
                        onUpdate={this.onUpdate}
                        onCancel={this.hideEditForm}
                    />
                )}
                {editingUser && (
                    <EditUserForm
                        user={{username, name, surname, teacher}}
                        onUpdate={this.updateUserData}
                        onCancel={this.hideEditUserForm}
                    />
                )}
            </div>
        )
    }
}

export default ProfilePage;