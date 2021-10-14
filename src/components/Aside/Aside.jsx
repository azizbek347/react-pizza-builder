import "./style.css";
import {Button} from "react-bootstrap"
import {useMyContext} from "../../store";
import Togglers from "../Togglers";
import {useState} from "react";
import Modal from "../Modal";
import PizzaLoader from "../PizzaLoader";
import {has, load, save} from "../../utils/localStorageUtil";
import {v4 as uuid} from "uuid";
import Preloader from "../Preloader";

const Aside = () => {
    const {state: {ingredients = {}, addedIngredients = [], totalPrice = 0}, dispatch} = useMyContext();
    const [ckeckoutVisibility, setCheckoutVisibility] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [msg, setMsg] = useState("");
    const [pizzaLoaderVisibility, setPizzaLoaderVisibility] = useState(false);
    const [preloaderIsShown, setPreloaderIsShown] = useState(false);

    const savePizza = () => {
        let key = uuid();
        while (has(key) !== null) {
            key = uuid();
        }
        save(key, addedIngredients);
        setIsSaved(prev => true);
        setMsg(prev => key);
    }

    const pizzaLoad = (key) => {
        const datas = load(key);
        let callback;
        if (datas === null) {
            callback = () => {
                alert("Wrong code");
                setPreloaderIsShown(prev => false);
            };
        } else {
            callback = () => {
                dispatch({type: "loadPizza", payload: datas})
                setPizzaLoaderVisibility(prev => false);
                setPreloaderIsShown(prev => false);
            };
        }
        setPreloaderIsShown(prev => true);
        setTimeout(callback, 3000);
    }

    return <aside>
        <div className="d-flex align-items-center justify-content-between mb-5">
            <h4 className="text-muted">Your pizza</h4>
            <span className="badge badge-pill badge-secondary p-2 px-3">{totalPrice} $</span>
            <Button variant={"warning"} onClick={() => {
                dispatch({type: "reset"})
                setMsg(prev=>"");
                setIsSaved(prev=>false);
            }}>Reset pizza</Button>
        </div>
        <ul className="list-group mb-4">
            {Object.keys(ingredients).map(el => {
                return <li key={ingredients[el].label} className="list-group-item"><Togglers el={ingredients[el]}/>
                </li>;
            })}
            <li className="list-group-item">
                <div className="d-flex justify-content-between align-content-center">
                    <h6>Total</h6>
                    <h4>{totalPrice}$</h4>
                </div>
            </li>
            <li className="list-group-item">
                <div className="d-flex justify-content-between align-content-center">
                    <Button variant={"success"} onClick={savePizza}
                            disabled={addedIngredients.length === 0 ? true : false}>Save pizza</Button>
                    <Button variant={"primary"} onClick={() => setCheckoutVisibility((prev) => !prev)}
                            disabled={addedIngredients.length === 0 ? true : false}>Checkout</Button>
                </div>
            </li>
            <li className="list-group-item">
                <div>
                    <Button variant={"dark"} onClick={() => setPizzaLoaderVisibility((prev) => !prev)}>Load
                        pizza</Button>
                </div>
            </li>
        </ul>
        {isSaved &&
        <h5 className="text-center text-success">Your pizza configuration has been saved. Your number is: {msg}</h5>}
        <Modal show={ckeckoutVisibility} onHide={() => setCheckoutVisibility((prev) => !prev)}/>
        <PizzaLoader show={pizzaLoaderVisibility} onHide={() => setPizzaLoaderVisibility((prev) => !prev)}
                     onSubmit={pizzaLoad}></PizzaLoader>
        <Preloader visible={preloaderIsShown}></Preloader>
    </aside>
}

export default Aside;