'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import { Pagination } from 'antd';
// import './index.scss';

class auditContChild extends React.Component {
    constructor() {
        super();
    }
    render() {
        function onChange(pageNumber) {
            console.log('Page: ', pageNumber);
        }
        return (
            <div >
                这是页面{this.props.params.id}
            </div>
        );
    }
}
export default auditContChild;