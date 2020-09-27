import { apiClient } from "@jetkit/react"
import * as React from "react"
import { User } from "jkv2-core"
import { Button, TextField } from "@material-ui/core"

const randint = (): number => Math.round(Math.random() * 10000000)

interface IUserEditProps {}

// sample api client methods
const listUsers = async (): Promise<User[]> => (await apiClient.get("/user")).data
const createUser = async (params: Partial<User>): Promise<User[]> => (await apiClient.post("/user", params)).data

const UserEdit: React.FC<IUserEditProps> = (props) => {
  const [newUserEmail, setNewUserEmail] = React.useState<string>(`mischa${randint()}@jetbridge.com`)
  const [newUserName, setNewUserName] = React.useState<string>(`mischa${randint()}`)
  const [users, setUsers] = React.useState<User[]>()

  // list users
  const loadUsers = () => listUsers().then((res) => setUsers(res)) && undefined
  React.useEffect(loadUsers, [])

  // create user
  const handleCreate = React.useCallback(async () => {
    await createUser({ email: newUserEmail, name: newUserName })
    loadUsers()
    setNewUserEmail(`mischa${randint()}@jetbridge.com`)
    setNewUserName(`mischa${randint()}`)
  }, [newUserEmail, newUserName])

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

      <section>
        <form>
          Email: <TextField onChange={(evt) => setNewUserEmail(evt.target.value)} value={newUserEmail} />
          <br />
          Name: <TextField onChange={(evt) => setNewUserName(evt.target.value)} value={newUserName} />
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        </form>
      </section>
    </>
  )
}

export default UserEdit
