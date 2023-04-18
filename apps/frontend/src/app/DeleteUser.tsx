import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import { query } from './UserList';

const DeleteButton = styled.span`
  cursor: pointer;
`;

const mutation = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;

type Props = {
  id: number;
};

export const DeleteUser = ({ id }: Props) => {
  const [deleteUser] = useMutation(mutation, {
    refetchQueries: [{ query }, 'Users'],
  });

  return (
    <DeleteButton onClick={() => deleteUser({ variables: { id } })}>
      ❌
    </DeleteButton>
  );
};
