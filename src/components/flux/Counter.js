import React, { Compoenent } from 'react';
import CounterStore from './CounterStore';
import Actions from './Actions';


class Counter extends Compoenent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);

        this.state = {
            count: CounterStore.getCounterValues()[props.caption]
        }
    }

    compoenentDidMount() {
        CounterStore.addChangeListener(this.onChange);
    }

    compoenentWillUnmount() {
        CounterStore.removeChangeListener(this.onChange);
    }

    onChange() {
        const newCount = CounterStore.getCounterValues()[this.props.caption];
        this.setState({count: newCount});
    }

    onClickIncrementButton() {
        Actions.increment(this.props.caption);
    }

    onClickDecrementButton() {
        Actions.decrement(this.props.caption);
    }

    render() {
        return(
            <div>
                <button style={buttonStyle} onClick={this.onClickIncrementButton}> + </button>
                <button style={buttonStyle} onClick={this.onClickDecrementButton}> - </button>
                <span>{caption} count: {this.state.count}</span>
            </div>
        )
    }
}