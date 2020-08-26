import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
  Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Input} from "reactstrap";
import { Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

function RenderDish({ dish }){
        return (
          <div className="col-12 col-md-5 m-1">
            <Card>
              <CardImg width="100%" src={dish.image} alt={dish.name}/>
              <CardBody>
                <CardTitle className="h5"> {dish.name} </CardTitle>
                <CardText> {dish.description} </CardText>
              </CardBody>
            </Card>
          </div>
        );
};
  
 function RenderComments({Comments, addComment, dishId}){
    if (Comments!== null){
        const comment = Comments.map((comment) => {
        return(
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>-- {comment.author}, { new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
            </li>
        )});
    
        return(
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              <ul className="list-unstyled">
                {comment}
              </ul>
              <CommentForm dishId={dishId} addComment={addComment} />
            </div>
          );
    }else{
        return(
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{ props.dish.name }</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{ props.dish.name }</h3>
              <hr/>
            </div>
          </div>
          <div className="row">
            <RenderDish dish={props.dish}/>
            <RenderComments Comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id} />
          </div>
        </div>
      );
    } else {
      return (<div>
      </div>);
    }
}

const required =(val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
  constructor(props){
    super(props);
    this.state={
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this); 
  }

  toggleModal(){
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values){
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    // console.log("Current State is : "+JSON.stringify(values));
    // alert("Current State is : "+JSON.stringify(values));
}

  render(){
    return(
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm className="container" onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlfor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating"
                  className="form-control">
                    <option default>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlfor="author">Your Name</Label>
                <Control.text model=".author" id="author" name="author"
                  placeholder="Your Name" 
                  className="form-control"
                  validators={{
                    required, 
                    minLength: minLength(3), 
                    maxLength: maxLength(15),
                }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: 'Required',
                    minLength: 'must be greater than 3 characters',
                    maxLength: 'must be 15 characters or less'
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlfor="comment">Comment</Label>
                <Control.textarea model=".comment" id="comment" name="comment"
                  placeholder="your comment"
                  rows="6" 
                  className="form-control"
                />
              </Row>
              <Row className="form-group">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default DishDetail;