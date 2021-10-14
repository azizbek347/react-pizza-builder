import {Card} from "react-bootstrap"
import "./style.css"
import {useMyContext} from "../../store";
import {doughImg} from "../../datas";

const Main = () => {
    const {state: {addedIngredients = []}} = useMyContext();
    return <main className="main">
        <h4 className="main-header-text">Your pizza:</h4>
        <div className="cards-wrapper">
            <Card className="justify-content-center">
                <Card.Img variant="top" src={doughImg}/>
            </Card>
            {addedIngredients.map(el => el.count > 0 ?
                <Card key={el.label} className="justify-content-center">
                    <Card.Img variant="top" src={el.image}/>
                </Card> : "")}
        </div>
    </main>
}

export default Main;
