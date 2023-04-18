import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { query } from './UserList';

const mutation = gql`
  mutation AddUser($firstName: String!, $age: Int!, $lastName: String) {
    addUser(firstName: $firstName, age: $age, lastName: $lastName)
  }
`;

export const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(18);

  const [addUser] = useMutation(mutation, {
    refetchQueries: [{ query }, 'Users'],
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addUser({ variables: { firstName, lastName, age } });
      }}
    >
      <fieldset>
        <legend>Add A User</legend>
        <label>
          First Name{' '}
          <input
            value={firstName}
            onChange={({ target: { value } }) => setFirstName(value)}
          />
        </label>
        <label>
          Last Name{' '}
          <input
            value={lastName}
            onChange={({ target: { value } }) => setLastName(value)}
          />
        </label>
        <label>
          Age{' '}
          <input
            type="number"
            value={age}
            onChange={({ target: { value } }) => setAge(parseInt(value))}
          />
        </label>
        <button type="submit">Add User</button>
      </fieldset>
    </form>
  );
};
