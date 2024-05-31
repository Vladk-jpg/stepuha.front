import React, {Component} from 'react';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            accessToken: '',
            error: ''
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        });

        if (response.ok) {
            const data = await response.json();
            if(data.message){
                this.setState({error: 'Неверный логин или пароль'})
            } else {
                this.setState({accessToken: data.token, error: ''})
                localStorage.setItem('accessToken', data.token)
                this.props.onLoginSuccess()
            }
        } else {
            this.setState({error: 'Неверный логин или пароль'})
        }
    };

    handleReg = () => {
        localStorage.removeItem('accessToken');
        this.setState({ accessToken: '', username: '', password: '', error: '' });
        this.props.onNotLogin();
    };

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Никнейм"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Пароль"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit">Войти</button>
                    </div>
                </form>
                {this.state.error && <div className={"error-text"}>{this.state.error}</div>}
                <div>
                    <button onClick={this.handleReg} className={"button-as-text"}>Не зарегистрирован</button>
                </div>
            </div>
        );
    }
}

export default LoginForm;
