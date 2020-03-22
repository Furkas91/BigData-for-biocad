import React from "react";
import {Dropdown} from "react-bootstrap";

export default class SwitchButton extends  React.Component{
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.props.handleChangeType(event);
    }

    render(){
        return (<div className="form-group ">

            <select className="form-control" name="city" onChange={this.handleInputChange}>
                <option selected value="Pressure" >Pressure</option>
                <option value="TempIns">TempIns</option>
                <option value="Weight">Weight</option>
                <option value="FlowRate">FlowRate</option>
                <option value="pH">pH</option>
                <option value="CO2">CO2</option>
            </select>
        </div>
        );
    }
}
