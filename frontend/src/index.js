import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import axios from 'axios';
import _ from "lodash";
import LimitInput from "./limit_input";
import TableSearch from "./table-search-script"
import imgdown from "./resources/arrow-down-outline.svg"
import imgup from "./resources/arrow-up-outline.svg"
import Graphic from "./graphic-script.js"
import Table from "./table-script.js"
import SwitchButton from "./switch-button-script";
//let url = "http://127.0.0.1:8000/api/v1/all/";
/*
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
}*/
//ReactDOM.render((<MyComponent/>), document.getElementById("log-container"));

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentData:'',
            type: "Pressure",
            data:{
                "Time":[],
                "Pressure": [],
                "Humidity": [],
                "TempIns": [],
                "TempWork":[],
                "pH": [],
                "Weight": [],
                "FlowRate": [],
                 "CO2": []},
            search: '',
            sort: 'asc',  // 'desc'
            sortField: 'id',
            row: null,
            currentPage: 0,
            imgPath:"" ,
            isModeSelected: false,
            isLoading: false,
            limitValue:'',
            logger:"",
            limstate:{}
        }
        this.onRowSelect = row => (
            this.setState({row})
        )
        this.searchHandler = search => {
            this.setState({search})
        }
        this.dataOf = (data)=>{
            let res= [];
            let i=1;
            for (let x in data){
                if(x!=="Time")
                    res.push({id:i++, type:x, value: data[x]})
            }

            return res;
        }
        this.handleChangeType=(e)=>{
            this.setState({type:e.target.value});
        }
        this.handleLimitChange = (event)=> {
            this.setState({ limitValue: event.target.value});
        }

        this.handleLimitClick = ()=>{


            axios.get("http://127.0.0.1:8000/api/v1/lastust/")
                .then(res => { let k = res.data;

                delete k["Time"];
                k[this.state.type] = this.state.limitValue.toString();
                    console.log(k);
                axios.post("http://127.0.0.1:8000/api/v1/updateust/", k).then(res=>{alert("Success")});
                });





            //console.log(k);

        }
    }

    componentDidMount() {

        this.timerData = setInterval(()=>{axios.get("http://127.0.0.1:8000/api/v1/rt/")
            .then(res => {
                //console.log(people);
                this.setState(state=>{
                    let array = res.data;
                    let massive = state.data;
                    for(let x in array)
                        massive[x].push(array[x]);
                    return{data: massive, currentData:res.data}});})}, 3000)
        this.timerLog = setInterval(()=>{axios.get("http://127.0.0.1:8000/api/v1/logs/")
            .then(res => {
                this.setState({logger:res.data}) })}, 1000)
    }
    componentWillUnmount() {
        this.timerData = null;
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



        let tableData = this.dataOf(this.state.currentData);
        let filteredData = getFilteredData(tableData, this.state.search);

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
                        <div id="graphic-container">
                            <Graphic data ={this.state.data[this.state.type]}/>
                            <div className="form-row" >

                                    <SwitchButton handleChangeType={this.handleChangeType} type={this.state.type}/>

                                    <LimitInput value={this.state.limitValue} onLimitChange={this.handleLimitChange} onLimitClick ={this.handleLimitClick}/>

                            </div>

                        </div>
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

