import { useContext } from 'react';

import UserContext from '../UserContext.js';

function AllData() {

  const context = useContext(UserContext);

  return (
    <div className='content'>
      <h2>All Data</h2>
      <div className='json'>
        {JSON.stringify(context, null, 2)}
      </div>
    </div>
  );
}

export default AllData;