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
import ReactApexChart from 'react-apexcharts';



class PieChart extends React.Component {
    constructor(props) {
        super(props);
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/chart/pie', false);
        xhr.send();
        let series = JSON.parse(xhr.responseText);
        this.state = {
            // series: [44, 55, 13, 43, 22],
            series: series,
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Fruits', 'Vegetables', 'Grains', 'Proteins', 'Dairy'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
        };
    }
    render() {
      return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />
          </div>
      );
    }
}


export default PieChart;
