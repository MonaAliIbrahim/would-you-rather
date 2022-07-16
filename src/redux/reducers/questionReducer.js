const initialState = {
  questions: [],
  response: {},
  addResult: '',
  answerResponse: '',
  error: null
}

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Questions
    case 'FETCH_QUESTION_REQUEST':
      return { ...state, answerResponse: '', addResult: '' };
    case 'FETCH_QUESTION_SUCCESS':
      return {
        ...state,
        questions: Object.values(action.payload),
      };
    case 'FETCH_QUESTION_FAIL':
      return {
        ...state,
        error: action.payload
      };
    // Add Question
    case 'ADD_QUESTION_REQUEST':
      return { ...state };
    case 'ADD_QUESTION_SUCCESS':
      return {
        ...state,
        response: action.payload,
        addResult: 'The Question has been added successfully',
      };
    case 'ADD_QUESTION_FAIL':
      return {
        ...state,
        error: action.payload,
        addResult: 'SomeThing went wrong, please try again later'
      };
    // Add Answer
    case 'ADD_ANSWER_REQUEST':
      return { ...state };
    case 'ADD_ANSWER_SUCCESS':
      return {
        ...state,
        answerResponse: 'success',
      };
    case 'ADD_ANSWER_FAIL':
      return {
        ...state,
        answerResponse: 'fail',
        error: action.payload,
      };

    default:
      return state;
  }
}

export default QuestionReducer;