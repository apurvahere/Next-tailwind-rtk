"use client";

import { User } from "@/type/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

export default function ListUsers() {
  const [count, setCount] = React.useState(0);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getUsers(),
  });

  return (
    <main className="flex flex-col items-center justify-between gap-20">
      <div className="flex flex-col gap-5 justify-center items-center pt-10">
        <h4>{count}</h4>
        <div className="flex gap-5">
          <button onClick={() => setCount((prev) => prev + 1)}>
            increment
          </button>
          <button onClick={() => setCount((prev) => prev - 1)}>
            decrement
          </button>
          <button onClick={() => setCount(0)}>reset</button>
        </div>
      </div>

      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data ? (
        <div className="flex flex-wrap gap-20 ">
          {data.map((user) => (
            <div
              key={user.id}
              className="border p-2 flex flex-col gap-5 justify-center items-center divide-y-2 divide-slate-600"
            >
              <img
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
              />
              <h3 className="pt-1.5">{user.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
