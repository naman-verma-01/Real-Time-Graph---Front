import './App.css';
import './Loader.css'
import Main from './Components/Main';


function App() {

  setTimeout(()=>{
    document.getElementsByClassName('loaderContainer')[0].style.display = 'none'
  },3000)

  
  return (
    <>
      <div className='loaderContainer'>
        <div class="loader"></div>
      </div>
      <Main />
    </>
  );
}

export default App;
