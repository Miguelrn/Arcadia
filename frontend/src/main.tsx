import React from 'react'
import.meta.env
import ReactDOM from 'react-dom/client'
import Master from './components/Master'
import './index.css'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

// console.log(`${import.meta.env.VITE_BACKEND_PORT}`)
const client = new ApolloClient({
  uri: `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/graphql`,
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Master />
    </ApolloProvider>
  </React.StrictMode>
)
