import * as React from "react"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { theme, primaryFont } from "."
import useGlobalCSS from "./GlobalCSS"
import { makeDecorator } from "@storybook/addons"

export default makeDecorator({
  name: "withMaterialTheme",
  parameterName: "materialTheme",
  wrapper: (storyFn, context, { parameters }) => {
    return React.createElement(() => {
      useGlobalCSS()

      return (
        <MuiThemeProvider theme={theme}>
          <link href={`https://fonts.googleapis.com/css?family=${primaryFont}:400,500&display=swap`} rel="stylesheet" />
          {storyFn(context)}
        </MuiThemeProvider>
      )
    })
  },
})
