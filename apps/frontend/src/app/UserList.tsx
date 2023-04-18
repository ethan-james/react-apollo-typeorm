import { useQuery, gql } from '@apollo/client';
import { User } from '@react-apollo-typeorm/entities';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteUser } from './DeleteUser';

const EmptyCell = styled.td`
  font-family: sans-serif;
  font-weight: 700;
  padding: 1rem;
  text-align: center;
`;

const Heading = styled.h1`
  font-family: sans-serif;
  margin-bottom: 3rem;
  text-align: center;
`;

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
    <>
      <Heading>React + Apollo + TypeORM Demo</Heading>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users.length ? (
              data.users.map(({ id, firstName, lastName, age }) => (
                <TableRow>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    {firstName} {lastName}
                  </TableCell>
                  <TableCell>{age}</TableCell>
                  <TableCell>
                    <DeleteUser id={id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <EmptyCell colSpan={4}>No Users</EmptyCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
