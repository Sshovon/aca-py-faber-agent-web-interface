import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router,Routes, Route,Link  } from "react-router-dom";
import Qr from './Components/Faber';
function App() {
  return (

    <div className="App">
      <Toaster/> 
      <Router>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route  path='/' element={<Qr/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
