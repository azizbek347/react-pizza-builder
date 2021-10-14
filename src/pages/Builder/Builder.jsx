import "./style.css";
import {Container, Row,Col} from "react-bootstrap";
import Main from "../../components/Main"
import Aside from "../../components/Aside"
import {useEffect} from "react";
import {useMyContext} from "../../store";

const Builder = ()=>{
    const {dispatch} = useMyContext();
    useEffect(()=>{
        dispatch({type:"reset"});
        return ()=>{};
    },[]);
    return <Container className="pt-5">
        <Row>
            <Col xs={8}>
                <Main></Main>
            </Col>
            <Col xs={4}>
                <Aside></Aside>
            </Col>
        </Row>
    </Container>
}

export default Builder