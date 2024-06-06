import React from 'react';
import ProductsPage from './pages/Products';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 'login',
            orders: [],
            isModer: false
        }
        this.handleRegistrationSuccess = this.handleRegistrationSuccess.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleNotLogin = this.handleNotLogin.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }

    setOrders = (orders) => {
        this.setState({orders});
    }

    setModer = (is) => {
        this.setState({isModer: is})
    }

    deleteOrder = (id) => {
        this.setState({orders: this.state.orders.filter(order => order.id !== id)});
    }

    handleRegistrationSuccess() {
        this.setState({currentPage: 'login'});
    }

    handleLoginSuccess() {
        this.setState({currentPage: 'profile'});
    }

    handleNotLogin() {
        this.setState({currentPage: 'register'});
    }

    handlePage(page) {
        this.setState({currentPage: page})
        if (page === 'login') {
            this.setState({orders: []});
            localStorage.removeItem('accessToken');
        }
    }

    renderCurrentPage() {
        const {currentPage} = this.state;

        switch (currentPage) {
            case 'products':
                return <ProductsPage setOrders={this.setOrders}
                                     orders={this.state.orders}
                                     isModer={this.state.isModer}/>;
            case 'login':
                return <LoginPage onLoginSuccess={this.handleLoginSuccess}
                                  onNotLogin={this.handleNotLogin}/>;
            case 'register':
                return <RegistrationPage onRegistrationSuccess={this.handleRegistrationSuccess}/>;
            case 'profile':
                return <ProfilePage onDeleteOrder={this.deleteOrder}
                                    setModer={this.setModer}/>
            case 'admin':
                return <AdminPage/>
            default:
                return <ProductsPage setOrders={this.setOrders}
                                     orders={this.state.orders}
                                     isModer={this.state.isModer}/>;
        }
    }

    render() {
        return (
            <div>
                <Header orders={this.state.orders} onDelete={this.deleteOrder} onPage={this.handlePage}
                        isModer={this.state.isModer}/>
                <main className={'wrapper'}>
                    {this.renderCurrentPage()}
                </main>

                <footer className={"footer"}>
                    <p>&copy; Stepuha.net | По вопросам: stepuha.net@gmail.com</p>
                </footer>
            </div>
        );
    }
}

export default App;
