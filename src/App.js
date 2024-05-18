import React from 'react';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import ShoppingCartPage from './pages/ShoppingCartPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from "./components/Header";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'login',
            orders: []
        };
        this.handleRegistrationSuccess = this.handleRegistrationSuccess.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleNotLogin = this.handleNotLogin.bind(this);
    }

    setOrders = (orders) => {
        this.setState({ orders });
    }
    deleteOrder = (id) => {
        this.setState({ orders: this.state.orders.filter(order => order.id !== id) });
    }

    handleRegistrationSuccess() {
        this.setState({ currentPage: 'login' });
    }
    handleLoginSuccess(){
        this.setState({ currentPage: 'products' });
    }
    handleNotLogin(){
        this.setState({ currentPage: 'register' });
    }

    renderCurrentPage() {
        const { currentPage } = this.state;

        switch (currentPage) {
            case 'home':
                return <HomePage />;
            case 'products':
                return <ProductsPage setOrders={this.setOrders} orders={this.state.orders}/>;
            case 'productDetail':
                return <ProductDetailPage />;
            case 'cart':
                return <ShoppingCartPage />;
            case 'login':
                return <LoginPage onLoginSuccess={this.handleLoginSuccess} onNotLogin={this.handleNotLogin} />;
            case 'register':
                return <RegistrationPage onRegistrationSuccess={this.handleRegistrationSuccess} />;
            default:
                return <HomePage />;
        }
    }

    render() {
        return (
            <div>
                {/* Заголовок приложения */}
                <Header orders={this.state.orders} onDelete={this.deleteOrder} />
                {/* Основное содержимое приложения */}
                <main className={'wrapper'}>
                    {this.renderCurrentPage()}
                </main>

                {/* Подвал приложения */}
                <footer className={"footer"}>
                    <p>&copy; Stepuha.net</p>
                </footer>
            </div>
        );
    }
}

export default App;
