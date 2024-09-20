import "./header.css";
import logo from "../../assets/logo.svg";

export default function Header() {
    return (
        <header className='header'>
            <figure className='header__icon'>
                <img src={logo} alt='S' />
            </figure>
        </header>
    );
}
