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
import PieChart from './PieChart.js';
import LineChart from './LineChart.js';
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
        const fontSize = 5;


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

                    <section id="data">
                        <PieChart dataFromParent={this.state} />
                        <LineChart dataFromParent={this.state}/>
                        <ColumnChart dataFromParent={this.state}/>
                    </section>
                </div>
            );
        }
        /*
        <Purchase dataFromParent = {this.state} />
        else {
          return (
            <section id="data">
            <form onSubmit = {this._enterData}>
              <div className="row education">
                <div className="three columns header-col">
                    <h1><span>Time Span</span></h1>
                </div>

                  <div className="nine columns main-col">
                      <div className="row item">
                        <input type="text" defaultValue="" size="25" id="Time Span" name="Time Span" value={this.state.value} onChange={this.handleTimeChange}/>
                      </div>
                  </div>
              </div>


              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Advertising</span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <input value={this.state.value} onChange={this.handleAdvertisingChange} type="text" defaultValue="" size="25" id="Advertising Amount" name="Advertising Amount" o/>
                  </div>
                </div>
              </div>

              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Wages</span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <input value={this.state.value} onChange={this.handleWagesChange} type="text" defaultValue="" size="25" id="Wage Amount" name="Wage Amount" o/>
                  </div>
                </div>
              </div>

              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Fixed Costs</span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <input value={this.state.value} onChange={this.handleFixedChange} type="text" defaultValue="" size="25" id="Fixed Amount" name="Fixed Amount" o/>
                  </div>
                </div>
              </div>

              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Other Costs</span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <input value={this.state.value} onChange={this.handleOtherChange} type="text" defaultValue="" size="25" id="Other Amount" name="Other Amount" o/>
                  </div>
                </div>
              </div>

              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Sector</span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <input value={this.state.value} onChange={this.handleSectorChange} type="text" defaultValue="" size="25" id="Sector Amount" name="Sector Amount" o/>
                  </div>
                </div>
              </div>

              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Online</span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <input value={this.state.value} onChange={this.handleOnlineChange} type="text" defaultValue="" size="25" id="Online Amount" name="Online Amount" o/>
                  </div>
                </div>
              </div>


              <div className="row skill">

                <div className="three columns header-col">
                    <h1><span>CSV File</span></h1>
                </div>

                <div align="center" oncontextmenu="return false">
                  <br /><br /><br />
                  <div className="dropzone">

                    <br /><br /><br />
                  </div>
                  <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
                </div>
              </div>
              <input align="center" type="submit" value="Submit" />
            </form>
            <section id = "results">
              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Low Risk Portfolio: </span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <h2><span>TDTF + BIV + PZA</span></h2>
                  </div>
                </div>
              </div>
              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>Medium Risk Portfolio: </span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <h2><span>GOOGL + URI + MSFT</span></h2>
                  </div>
                </div>
              </div>
              <div className="row work">

                <div className="three columns header-col">
                    <h1><span>High Risk Portfolio: </span></h1>
                </div>

                <div className="nine columns main-col">
                  <div className="row item">
                    <h2><span>AMZN + NVDA + AAPL</span></h2>
                  </div>
                </div>
              </div>
            </section>
        </section>

      );
        }
        */
    }
}

export default Store;
