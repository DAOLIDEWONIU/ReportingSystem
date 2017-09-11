
###########WEB端报装系统整体采用 “单页设计，按需加载” 。##############

    1、使用sass预编译语言进行css开发

    2、UI框架采用 蚂蚁金服 antd。

    3、视图库采用react。

    4、使用react-router处理前端路由。

    5、使用redux框架管理数据流。

    6、使用webpack打包，以及webpack-dev-server开发服务器进行前端分离开发。

#######详细版本及说明如下：############

     ==> react: @15.4.2

     ==> webpack：@1.13.1

     ==> flux：@3.6.0

     ==> 图标：iconfont ==> http://www.iconfont.cn/

     ==> UI组件：蚂蚁金服 antd ==> 官网 https://ant.design/index-cn
     
     
    package.json  引入antd 
    
        libraryName: 'antd',
        style: 'css'  // if true, use less
        
######项目开始#########

     $npm install

     $npm start || $npm run dist

        
######权限设置说明#########

        系统标识system_id=3，父节点father_id=3，系统权限user_right=2 的记录有新
        业务查勘、重新查勘、图纸设计、设计校对、工程变更项目、重新设计项目、设
        计未完成项目、设计完成项目、查勘终止项目、设计终止项目等10 项。当前用户
        以上权限设定的结果是将用户ID、“报装系统”的system_id=3 和如果=42为对方的财务系统对应的权限值，
        “0,1,0,0,0,0,1”写入用户权限表。其中权限值字符串的第一个字符“0”代表“受
        理人员”的操作权限；

        第二个字符“1”代表“设计人员”的操作权限；
        第三个字符“0”代表“审定人员”的操作权限；
        第四个字符“0”代表“审核人员”的操作权限；
        第五个字符“0”代表“实施人员”的操作权限；
        第六个字符“0”代表“设计调派”的操作权限；
        第七个字符''0"代表“系统管理员”的操作权限
        如具有权限，则写“1”，如无权限，则写“0”。

######整体业务流程#########

       新增业务、设计、审核、实施、设置

######整体业务流程#########

      1、新增业务（包含修改）=>2、设计（设计调配=>业务勘测=>图纸设计=>设计稿校对）=>3、审核（工程设计审核=>工程设计审定）=>4、实施（工程待缴费=>工程缴费确认）



#### 常见问题及解决


###部分截图

#登录页

<img src="https://github.com/DuAChao/ReportingSystem/blob/master/screenshots/login.PNG" width="888" height="439"/> 

#新增业务

<img src="https://github.com/DuAChao/ReportingSystem/blob/master/screenshots/add.PNG" width="888" height="439"/> 

#设计

<img src="https://github.com/DuAChao/ReportingSystem/blob/master/screenshots/design.PNG" width="888" height="439"/> 

#设计详情

<img src="https://github.com/DuAChao/ReportingSystem/blob/master/screenshots/info.PNG" width="888" height="439"/> 

#设置

<img src="https://github.com/DuAChao/ReportingSystem/blob/master/screenshots/setting.PNG" width="888" height="439"/> 





     
     