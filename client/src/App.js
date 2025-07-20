import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { StepProvider } from './context/StepContext';
import { WorkDetailsProvider } from './context/WorkDetails';
import MyBoard from './components/MyBoard';
import Header from './components/Header';
import Login from './components/Login';


function App() {
  return (
    <div className="app-container">
      <StepProvider>
        <WorkDetailsProvider>
          <Router>
            <Header/>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/my-board' element={<MyBoard/>}></Route>
            </Routes>
          </Router>
        </WorkDetailsProvider>
      </StepProvider>
    </div>
  );
}

export default App;
