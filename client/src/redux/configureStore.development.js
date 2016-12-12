import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '@src/reducers';
import apiMiddleware from './callApiMiddleware';

const enhancer = compose(
    applyMiddleware(
        createLogger(),
        apiMiddleware,
        thunk,
        routerMiddleware(hashHistory),
    )
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers'));
        });
    }

    return store;
}