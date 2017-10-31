import { createStore } from 'redux'
import { reducers } from './rootreducer'



export function configureStore(initialState = {}) {  
    const store = createStore(
      reducers,
      initialState,
      window.devToolsExtension()
    )
    return store;
  };
  
  export const store = configureStore(); 