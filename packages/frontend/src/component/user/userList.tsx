import * as React from "react"
import { useResources } from "../../hooks/userResources"
import { getUsers } from "../../api/user"
import Home from "../Home"

interface IUserEditProps { }

const UserList: React.FC<IUserEditProps> = (props) => {

  const users = useResources(getUsers)

  if (!users) return <>
    <Home />
    <h2>Loading...</h2></>

  return (
    <>
      <Home />
      <h2>Users</h2>

      <ul>
        {users.map((u) => (
          <li key={[u.name, u.email].join(",")}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>

    </>
  )
}

export default UserList
