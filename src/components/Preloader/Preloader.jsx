import "./style.css";
import {useRef} from "react";
import {createPortal} from "react-dom";

const Preloader = (props) => {
    const {visible} = props;
    const documentBody = window.document.body;
    const preloaderRef = useRef();

    const markup = <div className="loader-wrapper" ref={preloaderRef}>
        <div className="loader"></div>
    </div>;

    return visible ? createPortal(markup, documentBody) : "";
}

export default Preloader;