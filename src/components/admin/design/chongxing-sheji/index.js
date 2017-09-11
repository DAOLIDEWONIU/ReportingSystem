'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import { Pagination } from 'antd';
// import './index.scss';

class chongxingsheji extends React.Component {
    constructor() {
        super();
    }
    render() {
        function onChange(pageNumber) {
            console.log('Page: ', pageNumber);
        }
        return (
            <div className="MainRightContIn"> 
                <div className="MainRightContIn-in">
                    <div className='MainRightCont-tips'>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan="1">项目标题</td>
                                <td className='deltime'>时间</td>
                                <td className='delcode'>处理状态</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='MainRightCont-list'>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan="1">
                                    <Link>这是项目1标题</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目2</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目3</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            <tr>
                                <td>
                                    <Link>项目4</Link>
                                </td>
                                <td className='deltime'>2017-02-03</td>
                                <td className='delcode'>未处理</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className='Pagination'>
                            <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default chongxingsheji;