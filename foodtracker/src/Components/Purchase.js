import React, { useState, Component } from 'react';
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
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons'
//import { Slider, RangeSlider } from 'rsuite';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";


class Purchase extends Component {
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
    ],
    this.specific_dict = {},
    //this.item_dict = this.props.dataFromParent,
    this.item_dict = { 
      'Fruits': {'Apple': '3.00', 'Orange': '4.00', 'Grape': '2.50'},
      'Vegetables': {'Eggplant': '5.00'},
      'Grains': {'Wholewheat Bread': '2.50'},
      'Proteins': {'Chicken': '7.50'},
      'Dairy': {'Milk' : '4.00', 'Yogurt': '3.00'}
    }
    this.total_cost = 0
    this.oldValue = 0
    this.state = {
      step: 'Category',
      submitted: false,
      category: '',
      selectedOptions: {},
      port1:  [
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

    this.onChange = this.onChange.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);

    this.handleSubmitChange = this.handleSubmitChange.bind(this);
    this.findItems = this.findItems.bind(this);
  }

calculateTotal(event) {
    event.preventDefault();
    
}
  findItems(event) {
    event.preventDefault();
    this.setState({step: 'slider'});
  };
  
  _enterData(event) {
    event.preventDefault();
    this.setState({step: 'loading'});
    console.log(JSON.stringify({
          'name': this.state.store,
          'street': this.state.street,
          'city': this.state.city
        })) 
    fetch("http://localhost:5000/getStoreInformation", {
        method: "POST",
        headers : {
          'Content-Type': 'application/json',
          'accept':'application/json'
        },
        body : JSON.stringify({
          'name': this.state.store,
          'street': this.state.street,
          'city': this.state.city
        })
    }) .then(response => {
        console.log(response.responseText)
        console.log(response)
        return response.json();
    }) .then(res => {
          this.item_dict = res
    }) .catch(function(error) {
        console.log('There has been a problem: ' + error.message);
        throw error;
    })
  };

  backButton() {
    this.setState({step: 'Category'});
  }


  
  handleSubmitChange() {
    this.setState({submitted: true})
  }
  
  onChange(value) {
      this.setState({category: value})
  }

  render() {
      const fontSize = 5;
      if (this.state.step === "Category") {
        return (
          <section id="data">
          <form onSubmit = {this.findItems}>
            <div className="row education">
              <div className="three columns header-col">
                  <h1><span>Select Category</span></h1>
              </div>
            </div>

            <div className="row skill">
                <RadioGroup onChange={ this.onChange }>
            
                    <RadioButton value="Fruits" rootColor = "black" pointColor = "red">
                    Fruits
                    </RadioButton>
                    <RadioButton value="Vegetables" rootColor = "black" pointColor = "red">
                    Vegetables
                    </RadioButton>
                    <RadioButton value="Grains" rootColor = "black" pointColor = "red">
                    Grains
                    </RadioButton>
                    <RadioButton value="Proteins" rootColor = "black" pointColor = "red">
                    Proteins
                    </RadioButton>
                    <RadioButton value="Dairy" rootColor = "black" pointColor = "red">
                    Dairy
                    </RadioButton>
                </RadioGroup>
            </div>

            <div className="row skill">

              <div className="three columns header-col">
                  <h1><span></span></h1>
              </div>

              <div className="nine columns main-col">
                <div className="row item">
                  <input align="center" type="submit" value="See Items" />                </div>
              </div>
            </div>
          </form>
      </section>
      

    );
        }
      /*
      <Slider
                  defaultValue={0}
                  min={0}
                  max={20}
                  step={1}
                  
                />
      onBeforeChange={(value) => this.oldValue = value}
                  onChange={(newvalue) => this.total_cost = this.total_cost + (Number({value}) * (value - this.oldValue))
                  }
                  style={{ width: "100%" }}
                  */
    else {
        
        this.specific_dict = this.item_dict[String(this.state.category)]
        const Sliders = () =>
        <div className  ="row education">
          
          {
            Object.entries(this.specific_dict)
            .map( ([key, value]) => (
              <div className="row work">
                <div className="three columns header-col">
                  <h1><span>{key}</span></h1>
                </div>
                <div className="nine columns main-col">
                  <Slider />
                </div>
              </div>

            ))
          }
          
        </div>
        
        return (
            
            <section id="data">
            <form onSubmit = {this.calculateTotal}>
              <div className="row education">
                <div className="three columns header-col">
                    <h1><span>Products</span></h1>
                </div>
                <div className="three columns main-col">
                  <h1><span>Price</span></h1>
                </div>
                <div className="three columns main-col">
                  <h1><span>Quantity</span></h1>
                </div>
              </div>
              <div className="row skill">
                  <Sliders />
              </div>
  
              <div className="row skill">
  
                <div className="three columns header-col">
                    <h1><span></span></h1>
                </div>
  
                <div className="nine columns main-col">
                  <div className="row item">
                    <input align="center" type="submit" value="Calculate Budget Statistics" />                </div>
                </div>
                <div className="three columns main-col">
                  <div className="row item">
                    <input align="center" type="submit" value="Calculate Budget Statistics" />                </div>
                </div>
              </div>
            </form>
        </section>
        
  
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

export default Purchase;
