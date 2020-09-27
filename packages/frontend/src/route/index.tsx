import * as React from "react"
import { Route, Switch } from "react-router-dom"
import UserEdit from "../component/user/UserEdit"

interface IRoutesProps {}

const Routes = (props: IRoutesProps) => {
  return (
    <Switch>
      <Route exact path="/" component={UserEdit} />
    </Switch>
  )
}

export default Routes
