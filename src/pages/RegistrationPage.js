import RegistrationForm from "../components/RegistrationForm";

function RegistrationPage({ onRegistrationSuccess }) {
    return (
        <div>
            <h2 className={"reg"}>Регистрация</h2>
            <RegistrationForm onRegistrationSuccess={onRegistrationSuccess} />
        </div>
    );
}

export default RegistrationPage;