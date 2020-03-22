import React from "react";
import {AreaChart} from "recharts";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Tooltip from "recharts/lib/component/Tooltip";
import Area from "recharts/lib/cartesian/Area";

export default class Graphik extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
                data:[] }
    }//this.props.
    render(){
        let array = this.props.data.slice();
        array = array.map((item,index)=>{ return{name:index, value: item}});
        return(
            <div>

                <AreaChart width={1000} height={350} data={array}
                           margin={{ top: 10, right: 30, left: 50, bottom: 0 }}>
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
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

                </AreaChart>
            </div>
        )
    }
}

