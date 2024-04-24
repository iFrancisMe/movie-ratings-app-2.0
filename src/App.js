import './App.css';
import {Route, Routes} from "react-router-dom";
import TitleBar from './components/TitleBar';
import Home from './routes/Home';
import Search from './routes/Search';
import Reviews from './routes/Reviews';
import Results from './routes/Results';

function App() {
  return (
    <div className="App">
      <TitleBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/results' element={<Results />} />
        <Route path='/reviews/:movieID' element={<Reviews />} />
        <Route path='/reviews/:movieID/:editMode' element={<Reviews />} />
      </Routes>
    </div>
  );
}
 
export default App;
