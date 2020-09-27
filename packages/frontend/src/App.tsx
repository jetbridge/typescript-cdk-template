import * as React from "react"
import { MuiThemeProvider, CssBaseline } from "@material-ui/core"
import { theme } from "./theme"
import { BrowserRouter } from "react-router-dom"
import Routes from "./route"
import useGlobalCSS from "./theme/GlobalCSS"

const App: React.FC = () => {
  useGlobalCSS()

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
