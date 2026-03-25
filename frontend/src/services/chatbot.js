// export const sendMessage = async (message) => {
//   const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       sender: "user",
//       message,
//     }),
//   });

//   return response.json();
// };

export const sendMessage = async (message) => {
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chatbot`, { // <-- your backend
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message, // send just the message, backend will call Gemini
    }),
  });

  return response.json(); // will return { reply: "AI response" }
};
