import { Button } from '@/components/ui/button';
import { Component } from 'react';
import DualHandleSlider from "./custom-dual-slider";
class Guess extends Component {
    render() {
        return (
            <div >
               
                    <div className="card card-body">
                        <center style={{ justifyContent: "center" }}>
                            <DualHandleSlider
                                upper={this.props.upper}
                                lower={this.props.lower}
                                max={this.props.max}
                            />
                        </center>
                    </div>
                <h1 className="text-3xl">
                    Is you number greater than {this.getMid()}?
                </h1> <br />
                <Button
                    onClick={this.props.yesButton}
                    className="mx-2"
                >Yes</Button>
                <Button
                    onClick={this.props.noButton}
                    className="mx-2"
                >No</Button> <br />
            </div>
        );
    }
    getMid = () => {
        const mid = Math.floor((this.props.upper + this.props.lower) / 2);
        return mid;
    }
}
export default Guess;