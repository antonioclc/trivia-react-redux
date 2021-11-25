export const SET_USER_DATA = 'SET_USER_DATA';
export const SAVE_TOKEN_DATA = 'SAVE_TOKEN_DATA';
export const SAVE_QUESTIONS_DATA = 'SAVE_QUESTIONS_DATA';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN_DATA,
  payload,
});

// função abaixo dispatcha obj com token

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS_DATA,
  payload,
});

export function getTokenThunk() {
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
  return (dispatch) => (
    fetch(TOKEN_URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch(saveToken(data));
        localStorage.setItem('token', JSON.stringify(data));
        fetch(`https://opentdb.com/api.php?amount=5&token=${data.token}`)
          .then((response) => response.json())
          .then((questions) => dispatch(saveQuestions(questions)));
      })
  );
}

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});
