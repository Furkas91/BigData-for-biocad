class TableValue extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: '', scale: 'c'};

        this.buttons = ['Давление', 'Влажность', 'Температура', 'Масса'];
    }

    handleChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        //const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const row = this.props.values.map((item, index) => <tr><td>{index}</td><td>{item[0]}</td><td>{item[1]}</td></tr>);

        return (
            <div >
                {/*<div>{buttons.map(item => {
                    (<button className="btn btnDefault">item</button>)
                })}*/}
                <table width="100%" border="2">
                    <tr>
                        <th> #</th>
                        <th>Type </th>
                        <th>Value</th>
                    </tr>
                    {row}
                    </table>
            </div>
        );
    }
}

const values = [["minecraft", 3],["Андрей", 2]];

ReactDOM.render((<TableValue values={values}/>), document.getElementById("table-container"));