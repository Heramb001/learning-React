import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import DishDetail from "./DishDetailComponent";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
    console.log('Menu Component Construtor is invoked');
  }

  componentDidMount(){
    console.log('Menu Component ComponentDidMount is invoked');
  }

  onDishSelect(dish){
      this.setState({ selectedDish:dish});
  }

  render() {
    console.log('Menu Component render is invoked');
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle className="h6">{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <DishDetail selectedDish = {this.state.selectedDish}/>
      </div>
    );
  }
}

export default Menu;
