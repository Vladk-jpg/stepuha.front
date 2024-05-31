import React from 'react';
import ProductsPage from './pages/Products';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Header from "./components/Header";
import ProfilePage from "./pages/ProfilePage";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 'login',
            orders: []
        }
        this.handleRegistrationSuccess = this.handleRegistrationSuccess.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleNotLogin = this.handleNotLogin.bind(this);
        this.handlePage = this.handlePage.bind(this);
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
    handlePage(page){
        this.setState({currentPage: page})
        if(page === 'login'){
            this.setState({orders: []});
            localStorage.removeItem('accessToken');
        }
    }

    renderCurrentPage() {
        const { currentPage } = this.state;

        switch (currentPage) {
            case 'products':
                return <ProductsPage setOrders={this.setOrders} orders={this.state.orders}/>;
            case 'login':
                return <LoginPage onLoginSuccess={this.handleLoginSuccess} onNotLogin={this.handleNotLogin} />;
            case 'register':
                return <RegistrationPage onRegistrationSuccess={this.handleRegistrationSuccess} />;
            case 'profile':
                return <ProfilePage onDeleteOrder={this.deleteOrder}/>
            default:
                return <ProductsPage setOrders={this.setOrders} orders={this.state.orders}/>;
        }
    }

    render() {
        return (
            <div>
                <Header orders={this.state.orders} onDelete={this.deleteOrder} onPage={this.handlePage} />
                <main className={'wrapper'}>
                    {this.renderCurrentPage()}
                </main>

                <footer className={"footer"}>
                    <p>&copy; Stepuha.net</p>
                </footer>
            </div>
        );
    }
}

export default App;
