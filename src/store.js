import {createContext, useReducer, useMemo, useContext} from "react";

const MyContext = createContext(null);
const ContextProvider = MyContext.Provider;
const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Must be used within context");
    return context;
}
const StoreProvider = ({reducer = () => {}, initialStoreValue = {}, children = null}) => {
    const [state, dispatch] = useReducer(reducer, initialStoreValue);
    const contextValue = useMemo(() => {
        return {state, dispatch};
    }, [state, dispatch]);
    return <ContextProvider value={contextValue}>{children}</ContextProvider>
};

export {useMyContext};
export default StoreProvider;