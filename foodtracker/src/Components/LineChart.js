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


class LineChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {

            series: [{
                name: "Budget",
                data: [45, 36, 73, 60, 68]
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Total Budget by Grocery Trip',
                align: 'left'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: ['2/26', '3/5', '3/18', '4/1', '4/10'],
              }
            },


          };
        }



        render() {
          return (



      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={700} />
</div>



          );
        }
      }


export default LineChart;
