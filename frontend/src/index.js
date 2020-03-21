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