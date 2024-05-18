import React, {useState} from 'react';
import Order from "./Order";

const showOrders = (props) => {
    return(<div>
        {props.orders.map(el => (
            <Order onDelete={props.onDelete} key={el.id} product={el} />
        ))}
    </div>)
}

const showNothing = () => {
    return(
        <div className="empty">
            <h2>Товаров нет</h2>
        </div>
    )
}

export default function Header(props) {
    let [cartOpen, setCartOpen] = useState(false)

    return (
        <header>
            <div>
                <span className={'logo'}>Stepuha.net - стипухи нет</span>
                <ul className={"nav"}>
                    <li>Главная</li>
                    <li>Кабинет</li>
                    <li>Авторизация</li>
                </ul>
                <button onClick={() => setCartOpen(cartOpen = !cartOpen)}
                        className={`shop-cart-button ${cartOpen && 'active'}`}>
                    Корзина
                </button>
                {cartOpen && (
                    <div className={"shop-cart"}>
                        {props.orders.length > 0 ?
                            showOrders(props) : showNothing()}
                    </div>
                )}
            </div>
        </header>
    )
}