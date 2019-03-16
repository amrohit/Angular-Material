import * as fromUi from "./shared/ui.reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

export interface State {
  ui: fromUi.State;
}

//grouping all the reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer
};

//Selector are helper func to pull info from our state
//it will get quick access to fromUi.State return by fromUi.uiReducer in
//our global app state, useful when we got more state slices than just one
//it used when you are targetting the state or value return by sub-reducer
export const getUiState = createFeatureSelector<fromUi.State>("ui");

/*creating a utitliy function that will take result of getUiState and run
directly in app reducer.second argument, telling func what to do with return object,here want to pull out the is loading state
*/
export const getIsLoading = createSelector(
  getUiState, //will give uiState
  fromUi.getIsLoading //from that uiState, will give isLoading value
);
