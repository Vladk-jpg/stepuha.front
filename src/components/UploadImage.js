import React, { Component } from 'react';

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            isLoading: false,
            error: null,
        };

        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleFileChange(event) {
        this.setState({ selectedFile: event.target.files[0] });
    }

    async handleUpload() {
        const { selectedFile } = this.state;
        const { id } = this.props;

        if (!selectedFile) {
            alert('Пожалуйста, выберите сначала файл!');
            return;
        }

        const formData = new FormData();
        formData.append('picture', selectedFile);

        const token = localStorage.getItem('accessToken');

        this.setState({ isLoading: true, error: null });

        try {
            const response = await fetch(`http://localhost:8080/api/goods/picture/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`, // Добавляем токен в заголовок
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const result = await response.json();
            console.log('Upload successful', result);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
            this.setState({ error: error.message });
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { isLoading, error } = this.state;

        return (
            <div className='load-image-form'>
                <input type="file" onChange={this.handleFileChange} />
                <button onClick={this.handleUpload} disabled={isLoading}>
                    {isLoading ? 'Загрузка...' : 'Загрузить изображение'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }
}

export default UploadImage;
