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



class FoodCategoryPieChart extends React.Component {
    constructor(props) {
        super(props);

        let xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('GET', '/api/chart/food_category_pie', false);
        xmlHttpRequest.send();
        let pieChartData = JSON.parse(xmlHttpRequest.responseText);

        for (let i = 0; i < pieChartData['labels'].length; ++i) {
            pieChartData['labels'][i] = pieChartData['labels'][i][0].toUpperCase() + pieChartData['labels'][i].slice(1);
        }

        this.state = {
            series: pieChartData['series'],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                title: {
                    text: 'Expense Breakdown per Food Category',
                    align: 'center'
                },
                labels: pieChartData['labels'],
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
                }],
                tooltip: {
                    y: {
                        formatter: function (n) {
                            return '$' + (Math.round(n * 100) / 100).toFixed(2);
                        }
                    }
                }
            }
        };
    }

    render() {
        return (
            <div id="chart" style={{margin: 'auto', width: 'max-content'}}>
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" height={350} width={500}/>
            </div>
        );
    }
}


export default FoodCategoryPieChart;
