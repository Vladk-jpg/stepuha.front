import LoginForm from "../components/LoginForm";

function LoginPage({ onLoginSuccess, onNotLogin}) {
    return (
        <div>
            <h2 className={"reg"}>Авторизация</h2>
            <LoginForm onLoginSuccess={onLoginSuccess} onNotLogin={onNotLogin} />
        </div>
    );
}

export default LoginPage;