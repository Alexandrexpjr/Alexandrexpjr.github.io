import './App.css';
import { Route, Routes } from 'react-router-dom';
import TimeToFiveDecades from './pages/TimeToFiveDecades';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/countdown" element={ <TimeToFiveDecades />} />
    </Routes>
  );
}

export default App;
