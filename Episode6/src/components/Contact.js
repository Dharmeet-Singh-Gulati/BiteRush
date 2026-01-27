import { useState, useEffect } from "react";

const Contact = () => {
  let [count, setCount] = useState(1);
  let [count2, setCount2] = useState(1);

  useEffect(() => {
    let timer = setInterval(() => {
      console.log("Namaste Op");
    }, 1000);
    console.log(count, count2);
    return () => {
      clearInterval(timer);
    };
  }, [count, count2]);

  let update = () => {
    setCount(count + 1);
    setCount2(count2 + 1);
  };

  return (
    <div className="contact-container">
      <h1>Lazy Loading is being used here</h1>
      <h1>Contact us</h1>
      <h3>Knowledge in progress</h3>
      <h1>Count is {count} </h1>
      <h1>Count2 is {count2} </h1>
      <button onClick={update}>Update</button>
    </div>
  );
};

export default Contact;
