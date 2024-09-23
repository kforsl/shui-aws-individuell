import "./header.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className='header'>
            <Link to='/'>
                <figure className='header__icon'>
                    <img src={logo} alt='S logo' />
                </figure>
            </Link>
        </header>
    );
}
