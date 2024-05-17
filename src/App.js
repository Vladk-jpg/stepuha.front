import React from 'react';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import ShoppingCartPage from './pages/ShoppingCartPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 'login'
        };
        this.handleRegistrationSuccess = this.handleRegistrationSuccess.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleNotLogin = this.handleNotLogin.bind(this);
    }

    handleRegistrationSuccess() {
        this.setState({ currentPage: 'login' });
    }
    handleLoginSuccess(){
        this.setState({ currentPage: 'register' });
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
                return <ProductsPage />;
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
                <header className="header">
                    <h1>stepuha.net - стипухи нет</h1>
                </header>

                {/* Основное содержимое приложения */}
                <main>
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
