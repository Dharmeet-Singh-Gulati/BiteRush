import { useState } from "react";

const Hello = () => {
  let [count, setCount] = useState(0);
  return (
    <div>
      <h1>This is From Hello component</h1>
      <h1>Count: {count}</h1>
      <button
        onClick={() => {
          setCount(++count);
        }}
      >
        Update
      </button>
    </div>
  );
};

export default Hello;
