import React, { useState } from 'react';
import { useRegisterMutation } from '../generated/graphql';
import { RouteComponentProps } from 'react-router';

export const Register: React.FC<RouteComponentProps> = ({history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  return (
    <form onSubmit={async e => {
      e.preventDefault();
      const response = await register({variables: {email, password}});
      if (response.data!.register) {
        history.push('/');
      }
    }}>
      <div>
        <input placeholder="Email" value={email} onChange={e => {setEmail(e.target.value)}} />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={e => {setPassword(e.target.value)}} />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>
    </form>
  )
}