import React, { Component } from 'react';
import { Form, FormGroup, FormLabel } from 'react-bootstrap';
import './Stopwatch.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const Separator = () => {
    return <FormLabel className='Stopwatch-number'>:</FormLabel>;
}

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tick: null,
            totalSeconds: 0
        };
    }

    incrementCount() {
        this.setState({
            totalSeconds: this.state.totalSeconds + 1
        });
    }

    getHours() {
        return parseInt(this.state.totalSeconds / 60 / 60) % 24;
    }

    getMinutes() {
        return parseInt(this.state.totalSeconds / 60) % 60;
    }

    getSeconds() {
        return this.state.totalSeconds % 60;
    }

    startCounter = () => {
        clearInterval(this.state.tick);
        this.setState({
            tick: setInterval(() => this.incrementCount(), 1000)
        });
    }

    stopCounter = () => {
        clearInterval(this.state.tick);
        this.setState({
            tick: null
        });
    }

    resetCounter = () => {
        clearInterval(this.state.tick);
        this.setState({
            totalSeconds: 0,
            tick: null
        });
    }

    resumeCounter = () => {
        clearInterval(this.state.tick);
        this.setState({
            tick: setInterval(() => this.incrementCount(), 1000)
        });
    }

    render() {
        let buttons = null;
        let started = this.getHours() > 0 || this.getMinutes() > 0 || this.getSeconds() > 0;
        if (!this.state.tick && !started) {
            buttons = (
                <ButtonGroup justified>
                    <ButtonGroup size="lg" className='Stopwatch-button-group'>
                        <Button variant='success' block bsSize='large'
                            className='Stopwatch-button'
                            onClick={this.startCounter}>Start</Button>
                    </ButtonGroup>
                </ButtonGroup>
            );
        } else if (!this.state.tick && started) {
            buttons = (
                <ButtonGroup justified>
                    <ButtonGroup size="lg" className='Stopwatch-button-group'>
                        <Button variant='warning' bsSize='large' block
                            className='Stopwatch-button'
                            onClick={this.resumeCounter}>Resume</Button>
                    </ButtonGroup>
                    <ButtonGroup size="lg" className='Stopwatch-button-group'>
                        <Button bsSize='large' block
                            className='Stopwatch-button'
                            onClick={this.resetCounter}>Reset</Button>
                    </ButtonGroup>
                </ButtonGroup>
            );
        } else {
            buttons = (
                <ButtonGroup justified>
                    <ButtonGroup size="lg" className='Stopwatch-button-group'>
                        <Button variant='danger' bsSize='large' block
                            className='Stopwatch-button'
                            onClick={this.stopCounter}>Stop</Button>
                    </ButtonGroup>
                    <ButtonGroup size="lg" className='Stopwatch-button-group'>
                        <Button bsSize='large' block
                            onClick={this.resetCounter}>Reset</Button>
                    </ButtonGroup>
                </ButtonGroup>
            );
        }
        return (
            <div className='Stopwatch'>
                <Form className='Stopwatch-display'>
                    <FormGroup bsSize='large' controlId='formStopwatch'>
                        <FormLabel className='Stopwatch-number'>{this.leadingZero(this.getHours())}</FormLabel>
                        <Separator />
                        <FormLabel className='Stopwatch-number'>{this.leadingZero(this.getMinutes())}</FormLabel>
                        <Separator />
                        <FormLabel className='Stopwatch-number'>{this.leadingZero(this.getSeconds())}</FormLabel>
                    </FormGroup>
                    <FormGroup>
                        {buttons}
                    </FormGroup>
                </Form>
            </div>
        );
    }

    leadingZero(num) {
        return num < 10 ? '0' + num : num;
    }
}

export default Stopwatch;