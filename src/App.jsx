
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Homepage from './pages/homepage';
import Postpage from './pages/Postpage';

function App() {
  return (
    <div>
       {
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path='/post/:id' element={<Postpage/>}/>
            
         </Routes>
        
      </BrowserRouter>
       }
    </div>
  );
}

export default App;

