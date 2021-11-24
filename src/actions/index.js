export const SET_USER_DATA = 'SET_USER_DATA';
export const SAVE_TOKEN_DATA = 'SAVE_TOKEN_DATA';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN_DATA,
  payload,
});

// função abaixo dispatcha obj com token

export function getTokenThunk() {
  const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

  return (dispatch) => (
    fetch(TOKEN_URL)
      .then((response) => response.json())
      .then((data) => {
        dispatch(saveToken(data));
        localStorage.setItem('token', JSON.stringify(data));
      })
  );
}

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});
