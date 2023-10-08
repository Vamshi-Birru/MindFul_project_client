import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css';
import Login from './pages/login/login'
import Register from "./pages/register/register";
 import Home from "./pages/home/home";
 import UserDetails from "./components/UserDetails";
import { UserProvider } from "./components/UserContext";
function App() {
  return (
   <UserProvider>
    <div className="App">
     
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/user/:userId" element={<UserDetails/>}/>
        </Routes>
      
      
    </div>
    </UserProvider>
    
  );
}

export default App;
