import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

const cache = new InMemoryCache({
  typePolicies : {
    Query : {
      fields :{
        clients : {
          merge(existing,incoming){
            return incoming
          }
        },
        projects : {
          merge(existing,incoming){
            return incoming
          }
        },
      }
    }
  }
})

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
        
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/projects/:id' element={<Project />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
