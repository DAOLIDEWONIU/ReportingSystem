import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class loading extends React.Component {
    constructor() {
        super();
    }
    render() {
        const style = {
                container: {
                    position: 'relative'
                },
                refresh: {
                    display: 'inline-block',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex:'9999'
                }
            };
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <RefreshIndicator size={50} left={180} top={200} loadingColor="#49A9EE" status={this.props.status ?　'loading' : 'hide'} style={style.refresh} />
            </MuiThemeProvider>
        );
    }
}
export default loading;