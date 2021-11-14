import { useContext } from 'react';
import { isCompositeComponentWithType } from 'react-dom/cjs/react-dom-test-utils.production.min';

import UserContext from '../UserContext.js';

function callAPI(){
  
  fetch("http://localhost:5000/account/all")
    .then(response => response.json())
      .then(data =>{
        // console.log(JSON.stringify(data));
        let el = document.getElementById('allData');
        data.forEach(element => {
          // console.log(JSON.stringify(element))
          el.innerHTML += JSON.stringify(element);
        });;
      }
    );
}

function AllData() {

  const context = useContext(UserContext);
  // callAPI();
  return (
    <div className='content'>
      <h2>All Data</h2>
      <button onClick={callAPI}>Get Data</button>
      <div className="container">
        <div id='allData' className="content"/>
      </div>
      
    </div>
  );
}

export default AllData;