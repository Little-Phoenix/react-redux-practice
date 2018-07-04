import React, { Component } from 'react'
import './eventloop.css'
import Message from './Message'
import Container from './Container'

class MicroTask extends Component {

    constructor (props) {
        super(props);

        this.state = {
            message: '',
            step: -1,
            allSteps: 25,
            codeSourceStyle: {
                height: '320px'
            }
        }
    }

    prevClick () {
        this.setState({
            step: this.state.step >= 0 ? this.state.step -1 : this.state.allSteps
        })
        this.setMessage();
    }

    nextClick () {
        this.setState({
            step: this.state.step <= this.state.allSteps ? this.state.step + 1 : 0
        })
        this.setMessage();
        console.log(this.state.step);
        
    }

    setMessage () {
        if (this.state.step === 2) {
            this.setState({
                message: 'setTimeout 回调函数将会添加至 task 队列中'
            })
        } else if (this.state.step === 4) {
            this.setState({
                message: 'Promise 回调函数将会添加至 microtask 队列中'
            })
        } else if (this.state.step === 8) {
            this.setState ({
                message: '在一个 task 执行结束后，将会执行 microtask'
            })
        } else if (this.state.step === 12) {
            this.setState ({
                message: '在第一个 Promise 结束之后，通过链式调用执行了第二个 Promise，同时将回调函数添加至 microtask 队列中'
            })
        } else if (this.state.step === 14) {
            this.setState ({
                message: '当前 microtask 执行完毕，将会执行队列中的下一个 microtask'
            })
        } else if (this.state.step === 19) {
            this.setState({
                message: '现在一个完整的 task 执行完毕，浏览器可能会进行页面重绘'
            })
        } else if (this.state.step === 25) {
            this.setState({
                message: '至此，该程序执行完毕'
            })
        } else {
             this.setState({
                 message: ''
             })
         }
    }

    render () {
        const openBrace = '{';
        const closeBrace = '}';

        return (
            <div className="body">
                <div className="content">
                    <div className="code-source" style={this.state.codeSourceStyle}>
                        <span className={this.state.step>=0 && this.state.step<=1 ? 'selected' : ''}>console.log('script start');</span><br/><br/>

                        <span className={this.state.step>=2 && this.state.step<=3 ? 'selected' : ''}>setTimeout(function() {openBrace}</span><br/>
                        <span className={this.state.step>=22 && this.state.step<=23 ? 'selected' : ''}>&nbsp;&nbsp;&nbsp;&nbsp;console.log('setTimeout');</span><br/>
                        {closeBrace},0);<br/><br/>

                        <span className={this.state.step>=4 && this.state.step<=5 ? 'selected' : ''}>Promise.resolve().then(function() {openBrace})</span><br/>
                        <span className={this.state.step>=11 && this.state.step<=12 ? 'selected' : ''}>&nbsp;&nbsp;&nbsp;&nbsp;console.log('promise1');</span><br/>
                        {closeBrace}).then(function() {openBrace}<br/>
                        <span className={this.state.step>=17 && this.state.step<=18 ? 'selected' : ''}>&nbsp;&nbsp;&nbsp;&nbsp;console.log('promise2');</span><br/>
                        {closeBrace});<br/><br/>

                        <span className={this.state.step>=6 && this.state.step<=7 ? 'selected' : ''}>console.log('script end');</span><br/>
                    </div>
                    <div className="item">
                        <div className="queue-title">task</div>
                        <div className="queue-content">
                            <Container show={this.state.step <= 20 && this.state.step > -1} isHighlight={this.state.step <= 20 && this.state.step > -1} text={'script'}/>
                            <Container show={this.state.step <= 24 && this.state.step >= 3} isHighlight={this.state.step <= 24 && this.state.step >= 21} text={'setTimeout callback'}/>
                        </div>
                    </div>
                    <div className="item">
                        <div className="queue-title">microtask</div>
                        <div className="queue-content">
                            <Container show={this.state.step <= 15 && this.state.step >= 5} isHighlight={this.state.step <= 15 && this.state.step >= 10} text={'Promise then'}/>
                            <Container show={this.state.step <= 18 && this.state.step >= 14} isHighlight={this.state.step <= 18 && this.state.step >= 16} text={'Promise then'}/>
                        </div>
                    </div>
                    <div className="item">
                        <div className="queue-title">JS stack</div>
                        <div className="queue-content">
                            <Container show={this.state.step <= 7 && this.state.step > -1} isHighlight={this.state.step <= 8 && this.state.step > -1} text={'script'}/>
                            <Container show={this.state.step <= 14 && this.state.step >= 11} isHighlight={this.state.step <= 14 && this.state.step >= 11} text={'Promise callback'}/>
                            <Container show={this.state.step <= 18 && this.state.step >= 17} isHighlight={this.state.step <= 18 && this.state.step >= 17} text={'Promise callback'}/>
                            <Container show={this.state.step <= 23 && this.state.step >= 22} isHighlight={this.state.step <= 23 && this.state.step >= 22} text={'setTimeout callback'}/>
                        </div>
                    </div>
                    <div className="item">
                        <div className="queue-title">log</div>
                        <div className="queue-content">
                            <Container show={this.state.step >= 1 } text={'script start'}/>
                            <Container show={this.state.step >= 7 } text={'script end'}/>
                            <Container show={this.state.step >= 12 } text={'promise1'}/>
                            <Container show={this.state.step >= 18 } text={'promise2'}/>
                            <Container show={this.state.step >= 23 } text={'setTimeout'}/>
                        </div>
                    </div>

                    <div className="last-item">
                        <div className="btn prev" onClick={ this.prevClick.bind(this) }>prev</div>
                        <div className="btn next" onClick={ this.nextClick.bind(this) }>next</div>
                    </div>
                    
                    <div className="alert-window">
                        <Message message={this.state.message}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MicroTask