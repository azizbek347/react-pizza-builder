import "./style.css";
import {Modal, Button} from "react-bootstrap";
import {useMyContext} from "../../store";
import {Link} from "react-router-dom";

const MyModal = (props) => {
        const {state: {addedIngredients = [], totalPrice}} = useMyContext();
    return <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter" className="mx-auto">
                Your order
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
            <p>The pizza has the following ingredients:</p>
            <ul className="list-unstyled my-5">
                {addedIngredients.map((el) => <li key={el.label + el.count}><span>{el.label}: {el.count}</span></li>)}
            </ul>
            <h4>Total price: {totalPrice}$</h4>
            <span>Continue to checkout?</span>
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
            <Button variant="dark" onClick={props.onHide}>Cancel</Button>
            <Button variant="primary" onClick={props.onHide}><Link to="/react-pizza-builder/checkout" className="btn-link">Continue</Link></Button>
        </Modal.Footer>
    </Modal>
}

export default MyModal;