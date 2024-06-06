import React, { Component } from 'react';

class TransferMoneyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            amount: '',
            successMessage: '',
            errorMessage: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { userId, amount } = this.state;
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch(`http://localhost:8080/api/supp/${userId}/${amount}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Не удалось выполнить операцию');
            }

            const result = await response.json();
            this.setState({ userId: '', amount: '' });
            this.props.onReload();
            this.setState({
                successMessage: `Успешно переведено ${amount}@`,
                errorMessage: ''
            });

        } catch (error) {
            this.setState({
                errorMessage: error.message,
                successMessage: ''
            });
        }
    };

    render() {
        const { userId, amount, successMessage, errorMessage } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit} className="add-form-container">
                    <h2 className="add-form-title">Перевод средств</h2>
                    <div>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={userId}
                            placeholder="id получателя"
                            onChange={this.handleChange}
                            className="add-form-input"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            min="1"
                            max="999999"
                            value={amount}
                            placeholder="Сумма перевода"
                            onChange={this.handleChange}
                            className="add-form-input"
                            required
                        />
                    </div>
                    <button type="submit" className="add-form-button">Перевести</button>
                    {successMessage && <p className="add-form-p">{successMessage}</p>}
                    {errorMessage && <p className="add-form-p">{errorMessage}</p>}
                </form>
            </div>
        );
    }
}

export default TransferMoneyForm;
