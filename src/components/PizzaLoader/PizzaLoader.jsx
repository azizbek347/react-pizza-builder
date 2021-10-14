import "./style.css";
import {Button, Modal, FormControl} from "react-bootstrap";
import {useRef} from "react";

const PizzaLoader = (props) => {
    const inputRef = useRef();
    const submit = () => props.onSubmit(inputRef?.current?.value)

    return <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header className="position-relative pt-5">
            <h5 id="contained-modal-title-vcenter">Load a pizza using a configuration number:</h5>
            <button className="custom-close-button" onClick={props.onHide}>
                <span>&times;</span>
            </button>
        </Modal.Header>
        <Modal.Body className="text-center d-flex">
            <FormControl ref={inputRef}></FormControl>
            <Button variant="primary" onClick={submit} className="mx-4">Submit</Button>
        </Modal.Body>
    </Modal>
};

export default PizzaLoader;