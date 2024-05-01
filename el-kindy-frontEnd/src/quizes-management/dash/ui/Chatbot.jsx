// import React, { useState } from "react";

// function Chatbot() {
//   const [message, setMessage] = useState("");
//   const [reply, setReply] = useState("");

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/ask", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });
//       const data = await response.json();
//       setReply(data.reply);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Chatbot</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={message} onChange={handleMessageChange} />
//         <button type="submit">Send</button>
//       </form>
//       {reply && <p>{reply}</p>}
//     </div>
//   );
// }

// export default Chatbot;
