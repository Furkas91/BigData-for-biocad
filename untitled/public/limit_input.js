
//import ReactDOM from 'react-dom';
//import './index.css';


class LimitInput extends  React.Component{
    constructor(props) {
        super(props);
        this.state= { info : ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }
    handleClick(){
        if(this.props.limitvalue!=="")
            this.setState({info: "Применено"});
        else
            this.setState({info: ""});
    }

    render(){
        const value = this.props.limitvalue;
        //const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Введите предел</legend>
                <input value={value} onChange={this.handleChange} />
                <button className="" onClick={this.handleClick}>Применить</button>
                <p>{this.state.info}</p>
            </fieldset>
    );
    }
}
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value:"" , scale: 'c'};
        this.buttons = ["Давление", "Влажность", "Температура","Масса"];
    }

    handleChange(event) {
        this.setState({ value: event});
    }

    render() {
        //const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const but = this.buttons.map((item) => <button className="btn btn-success">{item}</button>);
        const btn = <button className="btn btnDefault btnPrimary target">item</button>;
        return (
            <div>
                <LimitInput
                    limitvalue={this.state.value}
                    onTemperatureChange={this.handleChange} />
            </div>
        );
    }
}
ReactDOM.render((<Calculator/>), document.getElementById("limit-input"));