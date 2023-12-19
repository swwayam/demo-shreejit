import "./App.css";
import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AuthContextProvider from "./providers/AuthContextProvider";
import { Routes , Route} from "react-router-dom";
import SignIn from "./Pages/Signin/SignIn";
import Navbar from "./Components/Navbar/Navbar";
import Protected from "./Protected";


function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Protected compo={<Dashboard />}/>}/>
        <Route path="/signin" element={<SignIn />}/>
      </Routes>
      
    </AuthContextProvider>
     
 
  );
}

export default App;
