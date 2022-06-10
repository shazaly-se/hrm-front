import React from "react";
import ReactDOM from "react-dom";
import Main from "./Entryfile/Main";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) { // enables hot module replacement if plugin is installed
    module.hot.accept();
}