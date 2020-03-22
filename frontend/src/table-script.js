import React from "react";

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <table className="table"  >
                    <thead>
                    <tr className="thead-dark">
                        <th onClick={this.props.onSort.bind(null, 'id')}> # {this.props.sortField === 'id' ? <img width="20" height="20" alt="" src={this.props.imgPath}/>: null }</th>
                        <th onClick={this.props.onSort.bind(null,'type')}>Type {this.props.sortField === 'type' ?  <img width="20" height="20" src={this.props.imgPath}/>: null}</th>
                        <th onClick={this.props.onSort.bind(null, 'value')}>Value {this.props.sortField === 'value' ?<img width="20" height="20" src={this.props.imgPath}/>: null}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map((item) => <tr key = {""+item.id+item.type} onClick={this.props.onRowSelect.bind(null, item)}><td>{item.id}</td><td>{item.type}</td><td>{item.value}</td></tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}