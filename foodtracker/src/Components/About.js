import React, { Component } from 'react';

class About extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
    }

    return (
      <section id="about">
      <div className="row">
         <div className="nine columns main-col">
            <h2>Inspiration</h2>
            <p>{' In 2020, consumers in the United States spent an average of 8.6 percent of their disposable income on food, distributed between at home groceries or outside meals. As one of the primary portions of spending, food expenditure requires an organized method for tracking to prevent overspending.'}</p>
         </div>
         <div className="nine columns main-col">
            <h2>Our Solution</h2>
            <p>{'Our project will provide a way for users to solely focus on food spending and see clear visualizations of individual purchases affecting budgets. This is a novel approach to automating tracking expenditures in the context of food. By searching through sample credit card statements and detecting food-related transactions, the app minimizes the amount of time the user has to spend per day monitoring their budget or keeping track of purchases. Additionally, it solves one of the primary problems that plague healthy community apps: maintaining user attention by providing short and clear updates in the form of visual graphs demonstrating which purchases drained the most budget at the end of each month.'}</p>
         </div>
         <div className="nine columns main-col">
            <p>
               <a href={'#data'} className="button"><i className="fa fa-download"></i>Choose Store</a>
            </p>

         </div>
      </div>
      </section>
    );
  }
}

export default About;
