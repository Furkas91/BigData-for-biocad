import React from "react";

export default class TableSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            value:''
        }
        this.valueChangeHandler = event=>{
            this.setState({value: event.target.value});
        }
    }

    render() {
        return (
            <div className="input-group mb-3 mt-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" onClick={()=>this.props.onSearch(this.state.value)}>Search</button>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.valueChangeHandler}
                />
            </div>
        );
    }
}