import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AreaChart} from "recharts";
import Tooltip from "recharts/lib/component/Tooltip";
import YAxis from "recharts/lib/cartesian/YAxis";
import XAxis from "recharts/lib/cartesian/XAxis";
import Area from "recharts/lib/cartesian/Area";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";

import axios from 'axios';

import _ from "lodash";
import Calculator from "./limit_input";
import TableSearch from "./table-search-script"
import imgdown from "./resources/arrow-down-outline.svg"
import imgup from "./resources/arrow-up-outline.svg"
import BoxGraphic from "./graphic-script.js"


//let url = "http://127.0.0.1:8000/api/v1/all/";
/*
class ClientServer extends React.Component{
    componentDidMount() {
        this.fetchQuotes()
        this.timer = setInterval(() => this.fetchQuotes(), 3000);

    }
    componentWillUnmount() {
        this.timer = null;
    }


let sendRequest =  (counter) => {
    let url = "http://127.0.0.1:8000/api/v1/all/";
    let response =  fetch(url);
    let json;
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        json =  response.json();
        alert("Success");
    } else {
        alert("Ошибка HTTP: " + response.status);
        json = "";
    }
let timer = setInterval(sendRequest(cont), 3000)
class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }
    componentDidMount() {
    }
    render() {
        return(<div>fsdf</div>)
    }
}*/
//ReactDOM.render((<MyComponent/>), document.getElementById("log-container"));

class Table extends React.Component {
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




let json="2";

console.log(json);


class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentData:'', data: [],

            //data: [{id:3,type:"Андрей", value:7},{id:2,type:"minecraft", value:3},{id:3,type:"Гусь", value:4}],
            search: '',
            sort: 'asc',  // 'desc'
            sortField: 'id',
            row: null,
            currentPage: 0,
            imgPath:"" ,
            isModeSelected: false,
            isLoading: false,
            //data: [{id:3,type:"Андрей", value:7},{id:2,type:"minecraft", value:3},{id:3,type:"Гусь", value:4}],
            logger:""}
        this.onRowSelect = row => (
            this.setState({row})
        )
        this.searchHandler = search => {
            this.setState({search})
        }

    }


    componentDidMount() {
        axios.get("http://127.0.0.1:8000/api/v1/rt/")
            .then(res => {

                //console.log(people);
                this.setState(state=>{ return{data: state.data.push(res.data), currentData:res.data}});
            })
    }

    render() {
        let onSort = sortField => {

            const cloneData = this.state.currentData;
            const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
            const imgP = sortType=== 'asc'? imgdown:imgup;
            const orderedData = _.orderBy(cloneData, sortField, sortType);

            this.setState({
                currentData: orderedData,
                sort: sortType,
                imgPath:imgP,
                sortField
            })
        }
        function getFilteredData(currentdata, search){
            if (!search) {
                return currentdata;
            }
            var result = currentdata.filter(item => {
                return (
                    (""+item["id"]).toLowerCase().includes(search.toLowerCase()) ||
                    item["type"].toLowerCase().includes(search.toLowerCase())
                );

            });
            if(!result.length){
                result = currentdata;
            }
            return result;
        }

        function dataOf(data){
            let res= [];
            let i=1;
            for (let x in data){
                if(x!=="Time")
                res.push({id:i++, type:x, value: data[x]})
            }
            console.log(res);
            return res;
        }

        let tableData = dataOf(this.state.currentData);
        let filteredData = getFilteredData(tableData, this.state.search);
        //let filteredData = tableData;

        return(<div>
            <div id="window-container">
                <div className="left-container" id="table-container">
                    <div className="container">
                        <TableSearch onSearch={this.searchHandler} />
                        <Table
                            sort={this.state.sort}
                            data={filteredData}
                            onSort={onSort}
                            sortField={this.state.sortField}
                            onRowSelect={this.onRowSelect}
                            imgPath={this.state.imgPath}
                        />
                    </div>
                </div>
                <div className="right-container">
                    <a href="../src/sub_page.html">График</a>
                    <div className="right-container sub-right">
                        <div id="graphic-container"><BoxGraphik/></div>
                        <div id="log-container">
                            <Logger value = {this.state.logger}/>
                        </div>

                    </div>
                </div>
            </div>
            <img src={"/resources/arrow-down-outline.svg"}/>
        </div>)
    }
}


class Logger extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(<div><p>{this.props.value}</p></div>);
    }
}
ReactDOM.render(<Users/>, document.getElementById("root"));

