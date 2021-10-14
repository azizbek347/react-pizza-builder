import "./style.css";
import {Form, Button, Container, Card} from "react-bootstrap";
import {useMyContext} from "../../store";
import {useState} from "react";

const Checkout = () => {
    const {state: {addedIngredients = []}} = useMyContext();
    const [form, setForm] = useState({
        "delivery": "Delivery",
        "regularOrNot": "off",
        "haveCoupon": "off",
    });
    const [formError, setFormError] = useState(false);
    const [formErrorMsg, setFormErrorMsg] = useState("");
    const [hasCoupon, setHasCoupon] = useState(false);
    const setField = (field, value) => {
        const verificationResult = verifyInput(field, value);
        if (verificationResult.valid) setForm({...form, [field]: value});
    }
    /*const findFormErrors = () => {
        const {name, email, delivery, additionalNotes, regularOrNot, haveCoupon, couponValue} = form;
        console.log(name, email, delivery, additionalNotes, regularOrNot, haveCoupon, couponValue);
    }*/
    const handleSubmit = (e) => {
        e.preventDefault();
        /*const newErrors = findFormErrors()*/
        window.alert("Submitted!");
    }

    const verify = (rule, value) => {
        const result = {valid: false, msg: "not a valid"};
        switch (rule.type) {
            case "required": {
                result.valid = value.trim() !== "";
                result.msg = "must be non empty";
                break;
            }
            case "minLength": {
                result.valid = value.trim().length >= rule.minLength;
                result.msg = `must be at least ${rule.minLength} characters`;
                break;
            }
            case "maxLength": {
                result.valid = value.trim().length <= rule.maxLength;
                result.msg = `must be at most ${rule.maxLength} characters`;
                break;
            }
            case "email": {
                const mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                result.valid = mailPattern.test(value);
                result.msg = "not a valid email address";
                break;
            }
            default:
                break;
        }
        return result;
    }

    const verifyInput = (name, value) => {
        let result = {};
        let errorMsgs = [];
        let valid = true;
        switch (name) {
            case "name": {
                result = {...verify({type: "required"}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Name ${result.msg}`)
                result = {...verify({type: "minLength", minLength: 4}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Name ${result.msg}`)
                result = {...verify({type: "maxLength", maxLength: 40}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Name ${result.msg}`);
                break;
            }
            case "email": {
                result = {...verify({type: "required"}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Email ${result.msg}`)
                result = {...verify({type: "minLength", minLength: 4}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Email ${result.msg}`)
                result = {...verify({type: "maxLength", maxLength: 40}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Email ${result.msg}`)
                result = {...verify({type: "email"}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Email ${result.msg}`);
                break;
            }
            case "delivery": {
                result = {...verify({type: "required"}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Delivery ${result.msg}`);
                break;
            }
            /*case "additionalNotes": {
                result = {...verify({type: "required"}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Additional notes ${result.msg}`)
                result = {...verify({type: "minLength", minLength: 4}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Additional notes ${result.msg}`)
                result = {...verify({type: "maxLength", maxLength: 40}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Additional notes ${result.msg}`);
                break;
            }
            case "regularOrNot": {
                result = {...verify({type: "required"}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Delivery ${result.msg}`);
                break;
            }*/
            case "haveCoupon": {
                if(!hasCoupon) {
                    setFormError(prev => false);
                    setFormErrorMsg("");
                }
                /*result = {...verify({type: "required"}, value)};
                valid &= result.valid
                if (!valid) errorMsgs.push(`Delivery ${result.msg}`);*/
                break;
            }
            case "couponValue": {
                result = {...verify({type: "required"}, value)};
                valid &= result.valid
                if (!valid && hasCoupon) errorMsgs.push(`Delivery ${result.msg}`);
                break;
            }
            default:
                return {valid:true};
        }

        if (!valid) {
            setFormErrorMsg(errorMsgs[0]);
            setFormError(prev => true);
        } else {
            setFormError(prev => false);
            setFormErrorMsg("");
        }
        return result;
    }

    return <Container className="pt-4">
        <h4 className="text-center">Ingredient info:</h4>
        <div className="cards-wrapper list-unstyled my-5">
            {addedIngredients.map(el =>
                <Card key={el.label} className="justify-content-center">
                    <Card.Img variant="top" src={el.image} className="card-img-top_custom"/>
                    <Card.Body className="card-body_custom">
                        <Card.Text>{el.count}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
        <h4 className="text-center">Checkout info:</h4>
        <Form className={`my-5 p-4 form-wrapper ${formError ? "has-error" : ""}`} onSubmit={handleSubmit}>
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formNameInput">
                <Form.Label className="custom-label">
                    Name:
                </Form.Label>
                <Form.Control type="text" placeholder="Your name" onChange={(e) => setField("name", e.target.value)}
                              required autoComplete={"off"}/>
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formNameEmail">
                <Form.Label className="custom-label">
                    Email:
                </Form.Label>
                <Form.Control type="email" placeholder="Your email"
                              onChange={(e) => setField("email", e.target.value)} required autoComplete={"off"}/>
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formDeliveryMethod">
                <Form.Label className="custom-label">
                    Choose delivery method:
                </Form.Label>
                <Form.Control as="select"
                              onChange={(e) => setField("delivery", e.target.value)} required={true}>
                    <option value="Delivery">Delivery</option>
                    <option value="Local pickup">Local pickup</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formAdditionalNotes">
                <Form.Label className="custom-label">
                    Additional notes:
                </Form.Label>
                <Form.Control
                    as="textarea"
                    className="custom-textarea"
                    onChange={(e) => setField("additionalNotes", e.target.value)}
                    autoComplete={"off"}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formRegularClientYes">
                <Form.Label className="custom-label">
                    Are you a regular client?
                </Form.Label>
                <Form.Check
                    type="radio"
                    label="Yes"
                    name="formRegularClient"
                    id="formRegularClientYes"
                    className="custom-radio"
                    onChange={(e) => setField("regularOrNot", e.target.value)}
                    required={true}
                />
                <Form.Check
                    type="radio"
                    label="No"
                    name="formRegularClient"
                    id="formRegularClientNo"
                    className="custom-radio mx-4"
                    onChange={(e) => setField("regularOrNot", e.target.value)}
                    required={true}
                />
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formHaveCoupon">
                <Form.Label className="custom-label">
                    Do you have a coupon code?
                </Form.Label>
                <Form.Check
                    type="checkbox"
                    className="custom-checkbox"
                    onChange={(e) => {
                        setField("haveCoupon", e.target.value);
                        setHasCoupon(prev=>!prev);
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center" controlId="formCoupon">
                <Form.Label className="custom-label">
                    Coupon:
                </Form.Label>
                <Form.Control type="text" placeholder="Coupon code"
                              onChange={(e) => setField("couponValue", e.target.value)} autoComplete={"off"} required
                              disabled={!hasCoupon}/>
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
                <Button variant="dark" type="reset" className="mx-3">
                    Reset
                </Button>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
        <h4 className="error-msg">{formErrorMsg}</h4>
    </Container>
}

export default Checkout;