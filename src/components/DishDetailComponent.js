import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  };
  
  renderDish(dish){
        return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle className="h5"> {dish.name} </CardTitle>
                <CardText> {dish.description} </CardText>
            </CardBody>
        </Card>
        );
  };
  
  renderComments(Comments){
    if (Comments!== null){
        const comment = Comments.map((comment) => {
            var date = new Date(comment.date);
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];
            var dateFormat = monthNames[date.getMonth()]+' '+date.getDate()+','+date.getFullYear();
            return(
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {dateFormat}</p>
                </li>
            )});
    
        return(
            <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comment}
                    </ul> 
            </div>
          );
    }else{
        return(
            <div></div>
        );
    }
  }

  render() {
    if (this.props.selectedDish !== null) {
      return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                { this.renderDish(this.props.selectedDish) }
            </div>
            { this.renderComments(this.props.selectedDish.comments) }
        </div>
      );
    } else {
      return (<div>
      </div>);
    }
  }
};

export default DishDetail;
