import ingredientsStatic from "./datas";

const calculatePrice = (state) => {
    state.totalPrice = state.addedIngredients.reduce((sum, {price, count}) => sum += price * count, 3);
    return {...state};
}

const loadPizza = (state,payload)=>{
    console.log(payload)
    const newState = {ingredientsStatic};
    newState.ingredients = {};
    newState.addedIngredients = payload;
    Object.values(ingredientsStatic).forEach(({...ingredient}) => {
        newState.ingredients[ingredient.label] = ingredient;
        newState.ingredients[ingredient.label].count = 0
    });
    return calculatePrice(newState)
}

const reset = (state) => {
    const newState = {ingredientsStatic};
    newState.ingredients = {};
    newState.addedIngredients = [];
    Object.values(ingredientsStatic).forEach(({...ingredient}) => {
        newState.ingredients[ingredient.label] = ingredient;
        newState.ingredients[ingredient.label].count = 0
    });
    return calculatePrice(newState)
};

const increase = (state, action) => {
    const {payload: {label}, payload} = action;
    state.ingredients[label].count++;
    if (!state.addedIngredients.includes(payload)) {
        state.addedIngredients.push(payload);
    }
    return calculatePrice(state)
}

const decrease = (state, action) => {
    const {payload: {label}, payload} = action;
    if (state.ingredients[label].count > 0) {
        state.ingredients[label].count--;
        if (state.ingredients[label].count === 0) {
            const index = state.addedIngredients.findIndex(el => el === payload);
            state.addedIngredients.splice(index, 1);
        }
    }
    return calculatePrice(state)
}

const reducer = (state, action) => {
    switch (action.type) {
        case "increase":
            return increase(state, action);
        case "decrease": {
            return decrease(state, action);
        }
        case "reset": {
            return reset(state);
        }
        case "checkout":{
            return state;
        }
        case "loadPizza":{
            return loadPizza(state,action.payload);
        }
        default:
            return state;
    }
}

export default reducer;