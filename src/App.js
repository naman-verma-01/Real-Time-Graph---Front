import './App.css';
import './Loader.css'
import Main from './Components/Main';
import { useEffect } from 'react';


function App() {

  setTimeout(()=>{
    document.getElementsByClassName('loaderContainer')[0].style.display = 'none'
  },3000)

  useEffect(()=>{
    const cursor = document.getElementById('cursor')


    document.addEventListener('mousemove',(event) =>{
      cursor.style.top = event.pageY + 'px';
      cursor.style.left = event.pageX + 'px';
    })
  },[])
  
  return (
    <>
      <div id='Navbar'>
        <p>Naman Verma</p>
      </div>
      <div id='cursor'></div>
      <div className='loaderContainer'>
        <div class="loader"></div>
      </div>
      <Main />
      <div id='footer'>
        <p></p>
      </div>
    </>
  );
}

export default App;
