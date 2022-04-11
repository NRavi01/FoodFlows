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


class ColumnChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
        name: 'Fruits',
        data: [44, 55, 57, 56, 61]
      }, {
        name: 'Vegetables',
        data: [76, 85, 101, 98, 87]
      }, {
        name: 'Grains',
        data: [41, 45, 52, 23, 41]
      }, {
        name: 'Proteins',
        data: [62, 48, 22, 44, 19]
      }, {
        name: 'Dairy',
        data: [48, 52, 53, 41, 34]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['2/26', '3/5', '3/18', '4/1', '4/10'],
        },
        yaxis: {
          title: {
            text: 'Expenses'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val
            }
          }
        }
      },


    };
  }


  render() {
    return (


        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350}
                          width={700}/>
        </div>

    );
  }
}


export default ColumnChart;
