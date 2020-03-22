import React from "react";

export default class LimitInput extends  React.Component{
    constructor(props) {
        super(props);
        this.state= { info : ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.props.onLimitChange(e);
    }
    handleClick(){
        this.props.onLimitClick();
    }

    render(){
        const value = this.props.limitvalue;
        //const scale = this.props.scale;
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Введите предел"
                       aria-label="Введите предел" aria-describedby="button-addon2" value={value} onChange={this.handleChange}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.handleClick}>Button</button>
                    </div>
            </div>

    );
    }
}

//ReactDOM.render((<Calculator/>), document.getElementById("ro"));