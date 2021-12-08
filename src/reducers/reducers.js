import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

/*
 * reducers (each take a state and an action, if concerned by the action, it changes the state (returns a new value))
 */
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}


/*
 * combined reducer: groups all the reducers together and only passes them the state they are concerned with
 */
// function moviesApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         movies: movies(state.movies, action)
//     }
// }
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
})

export default moviesApp;