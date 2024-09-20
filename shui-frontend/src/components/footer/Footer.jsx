import "./footer.css";
import addButton from "../../assets/add-button.svg";
import waves from "../../assets/waves.svg";
import { Link } from "react-router-dom";

export default function Footer({ isBgShowing }) {
    return (
        <footer className='footer'>
            {isBgShowing && (
                <img className='footer__background' src={waves} alt='' />
            )}

            <Link to='/add' className='footer__button'>
                <img src={addButton} alt='' />
            </Link>
        </footer>
    );
}
