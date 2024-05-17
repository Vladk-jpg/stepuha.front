import React, {Component} from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            surname: '',
            teacher: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleLog = () => {
        this.props.onRegistrationSuccess();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                this.props.onRegistrationSuccess();
                // Дополнительные действия после успешной отправки данных
            })
            .catch(error => {
                console.error('Error:', error);
                // Обработка ошибки
            });
        e.preventDefault();
    };

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Никнейм"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Имя"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            placeholder="Фамилия"
                            value={this.state.surname}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="teacher"
                            placeholder="Любимый преподаватель"
                            value={this.state.teacher}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit">Регистрация</button>
                    </div>
                </form>
                <div>
                    <button onClick={this.handleLog} className={"button-as-text"}>Уже зарегистрирован</button>
                </div>
            </div>
        );
    }
}

export default RegistrationForm;
