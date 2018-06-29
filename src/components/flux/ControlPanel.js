import React, {Component} from 'react';
import Summary from 'SummaryStore'

class ControlPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style}>
                <Counter caption="First"/>
                <Counter caption="Second"/>
                <Counter caption="Third"/>
                <hr/>
                <Summary/>
            </div>
        )
    }
}