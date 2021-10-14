import './App.css';
import ingredients from "./datas";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Builder from "./pages/Builder";
import NotFound from "./pages/NotFound";
import StoreProvider from "./store";
import reducer from "./reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from "./pages/Checkout";

function App(props) {
    return (
        <StoreProvider initialStoreValue={{ingredients}}
                       reducer={reducer}>
            <Router>
                <div className="App">
                    <Header></Header>
                    <Switch>
                        <Route path='/react-pizza-builder/' exact>
                            <Builder/>
                        </Route>
                        <Route path='/react-pizza-builder/ingredients' exact>
                            <NotFound/>
                        </Route>
                        <Route path='/react-pizza-builder/checkout' exact>
                            <Checkout/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </StoreProvider>
    );
}

export default App;