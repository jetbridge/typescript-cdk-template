import * as React from "react"
import { Route, Switch } from "react-router-dom"
import UserList from "../component/user/userList"

interface IRoutesProps { }

const Routes = (props: IRoutesProps) => {
  return (
    <Switch>
      <Route exact path="/" component={UserList} />
    </Switch>
  )
}

export default Routes
