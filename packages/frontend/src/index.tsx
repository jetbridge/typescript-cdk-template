import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import AppWithAuth from "./AppWithAuth"
import AppWithoutAuth from "./AppWithoutAuth"

ReactDOM.render(
  <React.StrictMode>
    {process.env.REACT_APP_USE_APP_WITHOUT_AUTH ? <AppWithoutAuth /> : <AppWithAuth />}
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
