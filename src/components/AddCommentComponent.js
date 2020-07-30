import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Row, Label} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class AddComment extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values){
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div className="container">
                <Button onClick={this.toggleModal} color="info" outline><span className="fa fa-edit"></span>  Add Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >
                        Add Comment:
                    </ModalHeader>
                    <ModalBody  style={{padding: "2rem"}}>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author"
                                                id="author"
                                                name="author"
                                                className="form-control"
                                                validators={{
                                                    minLength: minLength(3), maxLength:maxLength(12)
                                                }}></Control.text>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: "Name should contain atleast 3 characters",
                                            maxLength: "Name should not contain more than 15 characters"
                                        }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating"
                                                id="rating"
                                                name="rating"
                                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment"
                                                    id="comment"
                                                    name="comment"
                                                    rows="5"
                                                    className="form-control"></Control.textarea>
                            </Row>
                            <Row className="form-group">
                                <Button onClick={this.toggleModal} type="submit" outline color="success">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default AddComment;