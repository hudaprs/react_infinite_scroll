import React from "react"
import "./App.css"

// Components
import Role from "./components/Role"

// Redux
import { Provider } from "react-redux"
import store from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <Role />
    </Provider>
  )
}

export default App
