import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import percistRedurcers from './persisteReduces';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddlewares = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddlewares];

const store = createStore(percistRedurcers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddlewares.run(rootSaga);

export { store, persistor };
