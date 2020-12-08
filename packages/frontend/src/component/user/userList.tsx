import * as React from "react"
import { useResources } from "../../hooks/userResources"
import { getUsers } from "../../api/user"

interface IUserEditProps { }

const UserList: React.FC<IUserEditProps> = (props) => {

  const users = useResources(getUsers)

  if (!users) return <h2>Loading...</h2>

  return (
    <>
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
