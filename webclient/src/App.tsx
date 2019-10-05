import React from 'react';
import { useHelloQuery } from './generated/graphql';

const App: React.FC = () => {
  const {data, error, loading} = useHelloQuery();
  
  if(loading || !data) {
    return <div>Loading</div>
  } else if(error) {
    return <div>{error}</div>
  } else {
    return <div>{data.hello}</div>
  }
}

export default App;
