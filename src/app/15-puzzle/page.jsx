"use client";
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import '@/lib/helpers/array_helpers';
import { times } from 'lodash';
import { Component } from 'react';
import FlipMove from 'react-flip-move';
import './style.css';
const FLIP_DURATION = 750;
class Puzzle extends Component {
    constructor() {
        super();
        this.state = {
            squares: times(16, i => ({
                value: i
            })),
        };
    }
    balsal = async () => {
        for (let i = 0; i < 15; i++) {
            this.setState({
                squares: this.state.squares.slice().swap(i, i + 1)
            });
            await sleep(500);
        }

    }
    render() {
        let classNames;
        return (

            <div style={{ backgroundColor: "#57407c" }}
                className={'full-height'}
            >
                <Navbar title={"15 Puzzle"} />
                <div className={'justify-content-around '}
                    style={{ textAlign: "Center" }}>
                    <div style={{ textAlign: "center", height: "440px", width: "440px", margin: 'auto' }}
                        className={"m-5"}>
                        <FlipMove
                            duration={FLIP_DURATION}
                            easing="cubic-bezier(.12,.36,.14,1.2)"
                        >
                            {this.state.squares.map((stt) =>
                                <div key={stt.value}
                                    className={stt.value === 0 ? "square " : stt.value % 2 === 0 ? 'square shadow correct pt-1' : 'square shadow painted pt-1'}
                                >
                                    {stt.value === 0 ? "" : stt.value}
                                </div>
                            )}
                            <br />
                        </FlipMove>
                        <Button
                            onClick={this.balsal}
                        >
                            Animate
                        </Button>
                    </div>

                </div>

            </div>

        );
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Puzzle;