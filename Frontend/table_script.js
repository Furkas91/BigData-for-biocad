
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

class TableSearch extends React.Component {
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



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            isModeSelected: false,
            isLoading: false,
            data: [{id:3,type:"Андрей", value:7},{id:2,type:"minecraft", value:3},{id:3,type:"Гусь", value:4}],
            search: '',
            sort: 'asc',  // 'desc'
            sortField: 'id',
            row: null,
            currentPage: 0,
            imgPath:""
        }
        this.onRowSelect = row => (
            this.setState({row})
        )
        this.searchHandler = search => {
            this.setState({search})
        }
        this.getFilteredData = this.getFilteredData.bind(this);
    }
    getFilteredData(){
        const {data, search} = this.state;

        if (!search) {
            return data;
        }
        var result = data.filter(item => {
            return (
                (""+item["id"]).toLowerCase().includes(search.toLowerCase()) ||
                item["type"].toLowerCase().includes(search.toLowerCase())
            );
        });
        if(!result.length){
            result = this.state.data;
        }
        return result;
    }
    render() {
        let onSort = sortField => {

            const cloneData = this.state.data.concat();
            const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
            const imgP = sortType=== 'asc'? "resources/arrow-down-outline.svg":"resources/arrow-up-outline.svg";
            const orderedData = _.orderBy(cloneData, sortField, sortType);

            this.setState({
                data: orderedData,
                sort: sortType,
                imgPath:imgP,
                sortField
            })
        }
        const filteredData = this.getFilteredData();

        return (
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
        );
    }
}


let values = [[1,"Андрей", 2],[2,"Водичка", 9],[3,"Гречка", 2],[4,"Соль", 7],[5,"Паста", 1],[6,"Андрей", 10],[7,"minecraft", 3]];
//values.sort(sortField);
ReactDOM.render((<App/>), document.getElementById("table-container"));