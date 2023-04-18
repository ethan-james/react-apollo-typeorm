import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { query } from './UserList';

const Fieldset = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 5rem;
`;

const Legend = styled.legend`
  font-family: sans-serif;
  font-weight: 700;
  margin-bottom: 1rem;
`;

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
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        addUser({ variables: { firstName, lastName, age } });
      }}
    >
      <Fieldset>
        <Legend>Add A User</Legend>

        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
        />
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          value={age}
          onChange={({ target: { value } }) => setAge(parseInt(value))}
        />
        <Button type="submit">Add User</Button>
      </Fieldset>
    </Box>
  );
};
