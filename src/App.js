import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Pages/HomePage.js';
import Editor from './Pages/EditorPage.js';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div>
      <div>
        <Toaster
          position='top'
          toastOptions={{
            success:{
              iconTheme:{
                primary:'rgb(0, 90, 95)'
              }
            }
          }}
          >

          </Toaster>
      </div>
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
