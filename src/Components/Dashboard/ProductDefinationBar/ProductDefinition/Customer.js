import React, { Component } from 'react';
import Grid from '../../UI/Grid-Layout/Grid';

class Customer extends Component {
    state = {
        layout: {
            lg: [
                { i: '0', x: 0, y: 0, w: 4, h: 2, isResizable: false },
                { i: '1', x: 4, y: 0, w: 4, h: 2, isResizable: false },
                { i: '2', x: 8, y: 0, w: 4, h: 2, isResizable: false },
                { i: '3', x: 0, y: 2, w: 6, h: 2, isResizable: false },
                { i: '4', x: 8, y: 2, w: 6, h: 2, isResizable: false }],
            md: [
                { i: '0', x: 0, y: 0, w: 4, h: 2, isResizable: false },
                { i: '1', x: 4, y: 0, w: 4, h: 2, isResizable: false },
                { i: '2', x: 8, y: 0, w: 4, h: 2, isResizable: false },
                { i: '3', x: 0, y: 2, w: 6, h: 2, isResizable: false },
                { i: '4', x: 8, y: 2, w: 6, h: 2, isResizable: false }]
        },
        graphCount: 6,
        currentBreakpoint: "lg",
        currentColCount: 0,
        gridCol: { lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 },
        gridBreakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
    }
    render() {
        return (
            <Grid layouts={this.state.layout} breakpoint={this.state.gridBreakpoints} columnSize={this.state.gridCol} />
        );
    }
}

export default Customer;