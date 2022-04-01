import { createStore } from 'redux';
import rootReducer from './root'

const store = createStore(rootReducer);
export default store