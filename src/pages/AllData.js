import { useContext } from 'react';
import { isCompositeComponentWithType } from 'react-dom/cjs/react-dom-test-utils.production.min';

import UserContext from '../UserContext.js';

async function callAPI(){
  
  let response = await fetch("http://localhost:5000/account/all")
  let data = await response.json();
  console.log(JSON.stringify(data.body))
  return data.body
}

function AllData() {

  const context = useContext(UserContext);

  return (
    <div className='content'>
      <h2>All Data</h2>
      <div className='json'>
        {JSON.stringify(callAPI())}
      </div>
    </div>
  );
}

export default AllData;