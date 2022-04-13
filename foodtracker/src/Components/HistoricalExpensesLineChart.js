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


class HistoricalExpensesLineChart extends React.Component {
    constructor(props) {
        super(props);

        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', '/api/chart/historical_expenses_line', false);
        xmlHttpRequest.send();
        let lineChartData = JSON.parse(xmlHttpRequest.responseText);

        this.state = {
            series: [{
                name: 'Expenses',
                data: lineChartData['series']
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
                    text: 'Historical Expenses for All Grocery Trips',
                    align: 'center'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: lineChartData['labels'],
                    title: {
                        text: 'Grocery Trips (Dates)'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Expenses (Dollars)'
                    },
                    labels: {
                        formatter: function (n) {
                            return '$' + Math.round(n);
                        }
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (n) {
                            return '$' + (Math.round(n * 100) / 100).toFixed(2);
                        }
                    }
                }
            },
        };
    }


    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={700}/>
            </div>
        );
    }
}


export default HistoricalExpensesLineChart;
