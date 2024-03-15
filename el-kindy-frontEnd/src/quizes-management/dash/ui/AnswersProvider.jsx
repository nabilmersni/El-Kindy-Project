import { createContext, useState } from "react";

export const AnswersContext = createContext();

export function AnswersProvider({ children }) {
  const [answers, setAnswers] = useState([]);

  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>
      {children}
    </AnswersContext.Provider>
  );
}
