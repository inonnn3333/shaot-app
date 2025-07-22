import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home';
import { StepProvider } from './context/StepContext';
import { WorkDetailsProvider } from './context/WorkDetails';
import MyBoard from './components/MyBoard';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div className="app-container">
      <StepProvider>
        <WorkDetailsProvider>
          <Router>
            <Header/>
            <Routes>
              <Route path='/' element={<Navigate to="/login" replace />}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/register' element={<Register/>}></Route>
              <Route path='/home' element={<Home/>}></Route>
              <Route path='/my-board' element={<MyBoard/>}></Route>
            </Routes>
          </Router>
        </WorkDetailsProvider>
      </StepProvider>
    </div>
  );
}

export default App;
