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

class Graphik extends React.Component{
    constructor(props) {
        super(props);
        this.state= {data:  [
                {
                    "name": "Page A",
                    "uv": 4000,
                    "pv": 2400,
                    "amt": 2400
                },
                {
                    "name": "Page B",
                    "uv": 3000,
                    "pv": 1398,
                    "amt": 2210
                },
                {
                    "name": "Page C",
                    "uv": 2000,
                    "pv": 9800,
                    "amt": 2290
                },
                {
                    "name": "Page D",
                    "uv": 2780,
                    "pv": 3908,
                    "amt": 2000
                },
                {
                    "name": "Page E",
                    "uv": 1890,
                    "pv": 4800,
                    "amt": 2181
                },
                {
                    "name": "Page F",
                    "uv": 2390,
                    "pv": 3800,
                    "amt": 2500
                },
                {
                    "name": "Page G",
                    "uv": 3490,
                    "pv": 4300,
                    "amt": 2100
                }
            ]}
    }//this.props.
    render(){

        return(
            <div>
                <p>Hello</p>
                <AreaChart width={730} height={250} data={this.state.data}
                           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>

                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

                </AreaChart>
            </div>
        )
    }
}

class BoxGraphik extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[{x:1, y:2}, {x:2, y:4},{x:3, y:4},{x:1, y:1}]}
    }
    render(){
        return <Graphik
            data={this.state.data}
        />
    }
}

ReactDOM.render((<BoxGraphik/>), document.getElementById("graphic-container"));

let url = "http://127.0.0.1:8000/api/v1/all/";


/*
class ClientServer extends React.Component{
    /*
    constructor(props) {
        super(props);
        this.state= {
            data: [],
            counter: 0,
            isFetching: false
        };
        this.handleChange = this.handleChange();
        this.sendRequest = async (url) => {
            let response = await fetch(url);
            let json;
            if (response.ok) { // если HTTP-статус в диапазоне 200-299
                // получаем тело ответа (см. про этот метод ниже)
                json = await response.json();
                alert("Success");
            } else {
                alert("Ошибка HTTP: " + response.status);
                json = "";
            }
            this.setState((state)=> {counter: state.counter + 1});
            return json;
        }
        this.fetchQuotes = () => {
            this.setState(state=>{counter: state.counter+1; isFetching: true});
            fetch(QUOTE_SERVICE_URL)
                .then(response => response.json())
                .then(result => this.setState({quotes: result,
                    isFetching: false}))
                .catch(e => console.log(e));
        }
    }

    componentDidMount() {
        this.fetchQuotes()
        this.timer = setInterval(() => this.fetchQuotes(), 3000);

    }
    componentWillUnmount() {
        this.timer = null;
    }
    render(){

        return
    }
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        fetch(`some api url`).then(res => {
            this.setState({ todos: res.todos });
        });
    }

    return() {
        return (<div value ={this.state.todos}></div>)
    }
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
    counter++;
    console.log(counter);
    return json;
}
let cont
let timer = setInterval(sendRequest(cont), 3000)
class SimpleField extends React.Component{
    constructor(props) {
        super(props);
    }
    return() {
        return (<div>{this.props.value} </div>)
    }
}*/
//ReactDOM.render((<SimpleField value={cont}/>), document.getElementById("log-container"));


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

}
ReactDOM.render((<MyComponent/>), document.getElementById("log-container"));


let response =  fetch("http://127.0.0.1:8000/api/v1/all/");
let json="2";
if (response.ok) { // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    json = response.json();
    alert("Success");
} else {
    alert("Ошибка HTTP: " + response.status);
}
console.log(json);