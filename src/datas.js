import coldCutsImg from "./img/cold-cuts.jpg";
import pepperoniImg from "./img/pepperoni.jpg";
import spicesImg from "./img/spices.jpg";
import swissCheeseImg from "./img/swiss-cheese.jpg";
import vegetablesImg from "./img/vegetables.jpg";
import doughImg from "./img/dough.jpg";

const ingredients = {
    "Cold cuts": {
        price: 3,
        image: coldCutsImg,
        label: "Cold cuts",
    },
    "Pepperoni": {
        price: 2.5,
        image: pepperoniImg,
        label: "Pepperoni",
    },
    "Swiss cheese": {
        price: 2,
        image: swissCheeseImg,
        label: "Swiss cheese",
    },
    "Spices": {
        price: 0.25,
        image: spicesImg,
        label: "Spices",
    },
    "Vegetables": {
        price: 0.75,
        image: vegetablesImg,
        label: "Vegetables",
    },
};

const dough = {
    price: 3,
    image: doughImg,
    label: "Dough",
    count: 1
}

export { doughImg,dough, ingredients };
export default ingredients;
