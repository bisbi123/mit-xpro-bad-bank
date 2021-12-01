import React from "react";

function callAPI(){

  fetch('https://bad-bank-api.herokuapp.com/account/all')
    .then(resp => resp.json())
      .then(data =>{
        let el = document.getElementById('allData');
        el.innerHTML = "";
        data.forEach(obj => {
          el.innerHTML += JSON.stringify(obj,null,"\t\n");
        });
        
      })
  

}


class AllData extends React.Component{
  render(){
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
}

export default AllData;