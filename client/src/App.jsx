import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Header from './components/Header'
function App() {

  return (
    <>
      <BrowserRouter>
          <Header />
        <Routes>
          {/* <Route path='/' element={}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
