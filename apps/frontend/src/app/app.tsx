import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import styled from 'styled-components';

import { UserList } from './UserList';
import { AddUser } from './AddUser';

const StyledApp = styled.div`
  // Your style here
`;

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <StyledApp>
        <UserList />
        <AddUser />
      </StyledApp>
    </ApolloProvider>
  );
}

export default App;
