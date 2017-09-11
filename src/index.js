/**
 * Created by Administrator on 2017-02-14.
 */
'use strict';
import React from 'react';
import {render} from 'react-dom';
import AppContainer from './router';
import {Provider} from 'react-redux';
import store from './store';
import {Router, browserHistory} from 'react-router';

/**解决 ‘Unknown prop `onTouchTap` on <button> tag. Remove this prop from the element.’ 错误*/
import injectTapEventPlugin from 'react-tap-event-plugin'; 
injectTapEventPlugin();       
render(
    <Provider store={store}>
        <div>
            <AppContainer />
        </div>  
    </Provider>,
    document.getElementById('main')
);

/**写这个是因为 router3.0 的自带bug （作者已不打算修复）清除掉warn 信息 {You cannot change <Router routes>; it will be ignored}*/
/**参考链接 https://github.com/minooo/React-Study/blob/cfdf6f7ab52158ea3fb08ff345488de5dddcce16/step-04/src/js/index.js*/
// if (module.hot) {
//     /**
//      * Warning from React Router, caused by react-hot-loader.
//      * The warning can be safely ignored, so filter it from the console.
//      * Otherwise you'll see it every time something changes.
//      * See https://github.com/gaearon/react-hot-loader/issues/298
//      */
//     const orgError = console.error; // eslint-disable-line no-console
//     console.error = (message) => { // eslint-disable-line no-console
//         if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
//             // Log the error as normally
//             orgError.apply(console, [message]);
//         }
//     };
// }