import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Editor from './Pages/EditorPage';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/editor/:roomId" element={<Editor/>}></Route>
        </Routes>
      
      </BrowserRouter>


    </div>
  );
}

export default App;
