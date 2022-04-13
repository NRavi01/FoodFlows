import React, {useState, Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import ReactFileReader from './ReactFileReader';
import Chart from 'chart.js';
import Dropzone from 'react-dropzone';
import Portfolio from './Portfolio';
//import csv from 'csv';
import ReactLoading from 'react-loading';
import Purchase from './Purchase';
import FoodCategoryPieChart from './FoodCategoryPieChart.js';
import HistoricalExpensesLineChart from './HistoricalExpensesLineChart.js';
import ColumnChart from './ColumnChart.js';


class Store extends Component {
    constructor(props) {
        super(props);
        this.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        this.state = {
            step: 'form',
            submitted: false,
            store: null,
            street: null,
            city: null,
            item_dict: null,
            port1: [
                {
                    name: "Series 1",
                    data: [
                        {
                            x: "02-10-2017 GMT",
                            y: 34
                        },
                        {
                            x: "02-11-2017 GMT",
                            y: 43
                        },
                        {
                            x: "02-12-2017 GMT",
                            y: 31
                        },
                        {
                            x: "02-13-2017 GMT",
                            y: 43
                        },
                        {
                            x: "02-14-2017 GMT",
                            y: 33
                        },
                        {
                            x: "02-15-2017 GMT",
                            y: 52
                        }
                    ]
                }
            ],
            port2: null,
            port3: null
        }

        this.backButton = this.backButton.bind(this);
        this.storeName = this.storeName.bind(this);
        this.streetName = this.streetName.bind(this);
        this.cityName = this.cityName.bind(this);
        this.changePortfolio1 = this.changePortfolio1.bind(this);
        this.changePortfolio2 = this.changePortfolio2.bind(this);
        this.changePortfolio3 = this.changePortfolio3.bind(this);

        this.handleSubmitChange = this.handleSubmitChange.bind(this);
        this._enterData = this._enterData.bind(this);
    }


    _enterData(event) {
        event.preventDefault();
        this.setState({step: 'loading'});
        console.log(JSON.stringify({
            'name': this.state.store,
            'street': this.state.street,
            'city': this.state.city
        }))
        fetch("/api/getStoreInformation", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
                'name': this.state.store,
                'street': this.state.street,
                'city': this.state.city
            })
        }).then(response => {
            console.log(response.responseText)
            console.log(response)
            return response.json();
        }).then(res => {
            this.item_dict = res
        }).catch(function (error) {
            console.log('There has been a problem: ' + error.message);
            throw error;
        })
    };

    backButton() {
        this.setState({step: 'form'});
    }

    storeName(event) {
        this.setState({store: event.target.value});
    }

    streetName(event) {
        this.setState({street: event.target.value});
    }

    cityName(event) {
        this.setState({city: event.target.value});
    }

    handleSubmitChange() {
        this.setState({submitted: true})
    }

    changePortfolio1(port_dict) {
        this.setState({port1: port_dict})
    }

    changePortfolio2(port_dict) {
        this.setState({port2: port_dict})
    }

    changePortfolio3(port_dict) {
        this.setState({port3: port_dict})
    }

    render() {
        if (this.state.step === "form") {
            return (
                <div>
                    <section id="data">
                        <form onSubmit={this._enterData}>
                            <div className="row education">
                                <div className="three columns header-col">
                                    <h1>
                                        <span>Store Name</span>
                                    </h1>
                                </div>

                                <div className="nine columns main-col">
                                    <div className="row item">
                                        <input type="text" defaultValue="" size="26" id="Store Name" name="Store Name"
                                               value={this.state.value} onChange={this.storeName}/>
                                    </div>
                                </div>
                            </div>


                            <div className="row work">

                                <div className="three columns header-col">
                                    <h1>
                                        <span>Street Name</span>
                                    </h1>
                                </div>

                                <div className="nine columns main-col">
                                    <div className="row item">
                                        <input value={this.state.value} onChange={this.streetName} type="text"
                                               defaultValue="" size="25" id="Street Name" name="Street Name" o/>
                                    </div>
                                </div>
                            </div>

                            <div className="row work">

                                <div className="three columns header-col">
                                    <h1>
                                        <span>City Name</span>
                                    </h1>
                                </div>

                                <div className="nine columns main-col">
                                    <div className="row item">
                                        <input value={this.state.value} onChange={this.cityName} type="text"
                                               defaultValue="" size="25" id="City Name" name="City Name" o/>
                                    </div>
                                </div>
                            </div>

                            <div className="row skill">

                                <div className="three columns header-col">
                                    <h1>
                                        <span></span>
                                    </h1>
                                </div>

                                <div className="nine columns main-col">
                                    <div className="row item">
                                        <input align="center" type="submit" value="Find Store"/>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <br />
                        <br />

                        <input type="text" id="item-search-input" style={{margin: 'auto', display: 'block'}} />
                        <br />
                        <button id="item-search-button" style={{margin: 'auto', display: 'block'}}>Search</button>

                        <br />
                        <br />

                        <ul id="item-results" style={{margin: 'auto', display: 'block', width: 'max-content'}}></ul>
                    </section>

                    <br />
                    <br />

                    <section id="results">
                        <table id="item-table"></table>

                        <div id="chart-grid">
                            <FoodCategoryPieChart dataFromParent={this.state} />
                            <HistoricalExpensesLineChart dataFromParent={this.state}/>
                            <ColumnChart dataFromParent={this.state}/>
                        </div>
                    </section>
                </div>
            );
        }
    }
}

export default Store;
