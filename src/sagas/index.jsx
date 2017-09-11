/**
 * Created by liliwen on 2017/1/31.
 */
'use strict';
import watchLoginAsync from './login';
import watchAdminAsync from './admin';


export default function* rootSaga() {
    yield [
        watchLoginAsync(),
        watchAdminAsync(),
    ];
}