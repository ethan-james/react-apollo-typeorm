import { useQuery, gql } from '@apollo/client';
import { User } from '@react-apollo-typeorm/entities';
import { DeleteUser } from './DeleteUser';

export const query = gql`
  query Users {
    users {
      id
      firstName
      lastName
      age
    }
  }
`;

export const UserList = () => {
  const { loading, error, data } = useQuery<{ users: User[] }>(query);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.users.length ? (
          data.users.map(({ id, firstName, lastName, age }) => (
            <tr>
              <td>{id}</td>
              <td>
                {firstName} {lastName}
              </td>
              <td>{age}</td>
              <td>
                <DeleteUser id={id} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No Users</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
