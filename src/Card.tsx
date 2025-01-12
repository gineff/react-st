'use client';
//import { useActionState } from "react";
import requestEmail from "./requestUsername";

async function Card() {
  //const [state, formAction] = useActionState(requestUsername, 'n/a');

  const email = await requestEmail();
  return <div>Email: {email}</div>; 
  
/*  return (
    <form className="card">
     <button formAction={formAction}>count is {state}</button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </form>
  )*/
}

export default Card
