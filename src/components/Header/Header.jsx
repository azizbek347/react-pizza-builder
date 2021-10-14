import "./style.css";
import {Container, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (<Container fluid className="bg-dark p-2 px-4">
        <Row as={"nav"} className="text-muted">
            <ul className="d-flex list-unstyled mb-0">
                <li className="">
                    <NavLink to="/react-pizza-builder/" className="nav-link nav-link-custom" activeClassName="nav-link-custom_active" exact>
                        Build your pizza
                    </NavLink>
                </li>
                <li className="">
                    <NavLink to="/react-pizza-builder/ingredients" className="nav-link nav-link-custom" activeClassName="nav-link-custom_active">
                        Ingridients
                    </NavLink>
                </li>
            </ul>
        </Row>
    </Container>)
}

export default Header;