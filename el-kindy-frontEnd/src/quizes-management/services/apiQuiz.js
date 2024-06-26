import axios from "axios";

const baseURL = "http://localhost:3000/quizs";

const apiQuiz = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${baseURL}/${endpoint}`, // Corrected template string syntax
      data: data ? data : null,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error); // Corrected template string syntax
    throw error;
  }
};

export const getallQuizs = async () => {
  return await apiQuiz("get", "getall");
};

export const addQuiz = async (quiz) => {
  return await apiQuiz("post", "add", quiz);
};

const getQuizById = async (quiz) => {
  try {
    const response = await fetch(`${baseURL}/${quiz}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz data. Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");

    if (!contentType) {
      console.error("Response does not include a Content-Type header.");
    } else if (contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      console.error(
        `Invalid content type. Expected JSON, but received: ${contentType}`
      );
      const text = await response.text();
      console.error("Response body:", text);
      throw new Error("Invalid content type. Expected JSON.");
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    throw error;
  }
};

const updateQuiz = async (id, quizData) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, quizData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error in update request for quiz with ID ${id}:`, error);
    throw error;
  }
};

export { getQuizById, updateQuiz };

export const deleteQuiz = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting quiz with ID ${id}:`, error);
    throw error;
  }
};

export const startQuizUpdate = async (userId, quizId) => {
  try {
    const response = await axios.patch(
      `${baseURL}/startQuiz/${userId}/${quizId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating isComleted quiz with ID ${quizId}:`, error);
    throw error;
  }
};
export const assignUserToQuiz = async (quizId, email) => {
  try {
    const response = await fetch(`${baseURL}/${quizId}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      "Erreur lors de l'attribution de l'utilisateur au quiz: " + error.message
    );
  }
};

export const getUsersByQuiz = async (quizId) => {
  const response = await fetch(`${baseURL}/${quizId}/users`);
  return response.json();
};

export const startQuiz = async (userId, quizId, Started) => {
  try {
    const response = await axios.put(
      `${baseURL}/${userId}/${quizId}/startquiz`,
      { isStarted: Started }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchQuizzesByUser = async (userId, setQuizzes) => {
  try {
    const response = await axios.get(`${baseURL}/quizzes/${userId}`);
    setQuizzes(response.data);
    console.log("data", response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des quiz :", error);
  }
};
export const getQuizWithQuestionsAndAnswers = async (userId, quizId) => {
  try {
    const response = await axios.get(
      `${baseURL}/${userId}/${quizId}/questionsandanswers`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        "Erreur lors de la récupération du quiz avec les questions et les réponses"
    );
  }
};

export const getQuizUser = async (userId, quizId) => {
  try {
    const response = await axios.get(`${baseURL}/${userId}/${quizId}/quizuser`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        "Erreur lors de la récupération du quiz avec les questions et les réponses"
    );
  }
};

export const markQuizAsCompleted = async (userId, quizId) => {
  try {
    const response = await axios.put(
      `${baseURL}/users/${userId}/quizzes/${quizId}/complete`
    );
    if (response.status === 200) {
      console.log("Le quiz a été marqué comme terminé avec succès");
    }
  } catch (error) {
    console.error("Erreur lors du marquage du quiz comme terminé :", error);
  }
};
export const removeUserFromQuiz = async (userId, quizId) => {
  try {
    const response = await axios.delete(
      `${baseURL}/quizzes/${quizId}/users/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error removing user from quiz: " + error.message);
  }
};
export const getStartedUsersPercentage = async (quizId) => {
  try {
    const response = await axios.get(
      `${baseURL}/quiz/${quizId}/starteduserscount`
    );
    return response.data.percentage;
  } catch (error) {
    console.error("Erreur lors du calcul du pourcentage :", error);
    return 0;
  }
};

export const getQuizzesAndScoresByUserId = async (userId) => {
  try {
    const response = await fetch(`${baseURL}/${userId}/attestation`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des quizs et des scores");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Erreur lors de la requête vers le serveur");
  }
};
export const checkUserQuizzes = async (userId) => {
  try {
    const response = await axios.get(
      `${baseURL}/users/${userId}/quizzes/check`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      "Erreur lors de la vérification des quizs de l'utilisateur:",
      error
    );
  }
};
//*********************************Crud_Question***********************************

export const getQuestionsForQuiz = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${id}/questions`);
    return response.data.questions;
  } catch (error) {
    throw new Error(
      error.response.data.message ||
        "Une erreur s'est produite lors de la récupération des questions"
    );
  }
};

/*
export const createQuestionForQuiz = async (quizId, formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/${quizId}/questions`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
*/
export const createQuestionForQuiz = async (quizId, formData) => {
  const response = await axios.post(`${baseURL}/${quizId}/questions`, formData);
  return response.data;
};

export const deleteQuestionFromQuiz = async (quizId, questionId) => {
  try {
    const response = await axios.delete(
      `${baseURL}/${quizId}/questions/${questionId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

//********************* */

export const getQuestionById = async (quizId, questionId) => {
  try {
    const response = await axios.get(
      `${baseURL}/${quizId}/questions/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addImageToCourse = async (questionId, image) => {
  return axios.post(`${baseURL}/${questionId}/image`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const updateQuestionInQuiz = async (
  quizId,
  questionId,
  updatedQuestionData
  // image
) => {
  try {
    const formData = new FormData();
    formData.append("questionText", updatedQuestionData.questionText);
    formData.append("nbPoint", updatedQuestionData.nbPoint);

    // Vérifiez si une nouvelle image a été fournie
    // if (image) {
    //   formData.append("image", image);
    // }

    const response = await axios.put(
      `${baseURL}/${quizId}/questions/${questionId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ******************Crud-Answers*************************
// const api = axios.create({
//   baseURL: "http://localhost:3000/quizs",
// });

export const getAnswers = async (quizId, questionId) => {
  return await axios.get(
    `${baseURL}/${quizId}/questions/${questionId}/answers`
  );
};

export const createAnswer = async (quizId, questionId, answer) => {
  return await axios.post(
    `${baseURL}/${quizId}/questions/${questionId}`,
    answer
  );
};

export async function deleteAnswer(quizId, questionId, answerId) {
  try {
    const response = await axios.delete(
      `${baseURL}/${quizId}/questions/${questionId}/answers/${answerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw error;
  }
}

export async function getAnswerByIdAndQuestionId(questionId, answerId) {
  try {
    const response = await axios.get(
      `${baseURL}/${questionId}/answers/${answerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la réponse :", error);
    throw error;
  }
}

// export async function updateAnswer(questionId, answerId, updatedData) {
//   try {
//     const response = await axios.put(
//       `${baseURL}/${questionId}/answers/${answerId}`,
//       updatedData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour de la réponse :", error);
//     throw error;
//   }
// }

// export async function updateAnswer(questionId, answerId, updatedData, image) {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };

//     const response = await axios.put(
//       `${baseURL}/${questionId}/answers/${answerId}`,
//       image ? image : updatedData,
//       image ? config : null
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour de la réponse :", error);
//     throw error;
//   }
// }

export const addImageToAnswer = async (answerId, image) => {
  return axios.post(`${baseURL}/${answerId}/image`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export async function updateAnswer(
  questionId,
  answerId,
  answerText,
  isCorrect,
  image
) {
  try {
    const formData = new FormData();
    formData.append("answerText", answerText);
    formData.append("isCorrect", isCorrect);
    formData.append("image", image);

    const response = await axios.put(
      `${baseURL}/${questionId}/answers/${answerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error updating answer");
  }
}
