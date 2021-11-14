
import {getAllUsersAsArray} from '../dal'

function callAPI(){

  getAllUsersAsArray()
    .then(arrOut =>{
      arrOut.forEach(data => {
        let el = document.getElementById('allData');
        el.innerHTML += JSON.stringify(data);
        
      });
    })
  

}

function AllData() {

  
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