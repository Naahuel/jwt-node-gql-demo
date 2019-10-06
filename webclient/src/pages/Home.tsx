import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading, error } = useUsersQuery({
    fetchPolicy: "network-only"
  });

  return (
    <div>
      <h1>Home page</h1>
      <h2>Our users:</h2>
      {loading || !data ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.users.map(user => {
            return <li key={user.id}>{user.email}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
