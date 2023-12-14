import { gql, useQuery } from '@apollo/client'
import './App.css'

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`

type User = {
  id: string
  name: string
}

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS)

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          data?.users.map((user) => <li key={user.id}>
            <span>{user.name}</span>
          </li>)
        }
      </ul>
    </div>
  )
}

export default App
