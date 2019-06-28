import React from 'react';
import store from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from 'components/App';

const Root = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;