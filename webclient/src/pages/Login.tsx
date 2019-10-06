import React, { useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router";

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const response = await login({ variables: { email, password } });
        console.log(response.data!.login.accessToken);
      }}
    >
      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <input type="submit" value="Login" />
      </div>
    </form>
  );
};
