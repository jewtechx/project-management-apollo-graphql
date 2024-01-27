import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from './components/Header';
import Clients from './components/Clients';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <Clients />
          <Routes>
            {/* <Route path='/' element={}/> */}
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
