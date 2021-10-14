import "./style.css";
import {Button} from "react-bootstrap";
import {useMyContext} from "../../store";

const Togglers = ({el}) => {
    const {dispatch} = useMyContext();
    return <div className="d-flex justify-content-between align-items-center">
        <div className="col-6 p-0">
            <h4>{el.label}</h4>
            <span>{el.price} $</span>
        </div>
        <div className="d-flex col-5 p-0 justify-content-end">
            <Button variant="danger"
                    onClick={() => dispatch({type: "decrease", payload: el})} className="toggle-btn"
                    disabled={el.count === 0 ? true : false}>-</Button>
            <span className="toggle-fake-input">{el.count}</span>
            <Button variant="success"
                    onClick={() => dispatch({type: "increase", payload: el})} className="toggle-btn"
                    disabled={el.count === 100 ? true : false}>+</Button>
        </div>
    </div>
}

export default Togglers;