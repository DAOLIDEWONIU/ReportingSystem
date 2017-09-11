/**
 * Created by Administrator on 2017-05-16.
 */
import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
    container: {
        position: 'relative'
    },
    refresh: {
        display: 'inline-block',
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

function loading(wrappedComponent) {
    return class Loading extends React.Component {
        render(){
            if(this.props.data) {
                return <MuiThemeProvider muiTheme={getMuiTheme()}>
                            <RefreshIndicator left={180} top={200} loadingColor="#49A9EE" status="loading" style={style.refresh} />
                       </MuiThemeProvider>
            }
            return <wrappedComponent {...props} />
        }
    }
}