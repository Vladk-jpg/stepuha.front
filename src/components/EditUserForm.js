import React, { Component } from "react";

class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.user.username,
            name: props.user.name,
            surname: props.user.surname,
            teacher: props.user.teacher,
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = { ...this.state };
        this.props.onUpdate(updatedUser);
    };

    render() {
        const { onCancel } = this.props;
        const { username, name, surname, teacher } = this.state;

        return (
            <div className="edit-user-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                        />
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                        />
                        <label>Surname</label>
                        <input
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={this.handleChange}
                        />
                        <label>Favorite Teacher</label>
                        <input
                            type="text"
                            name="teacher"
                            value={teacher}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        );
    }
}

export default EditUserForm;
