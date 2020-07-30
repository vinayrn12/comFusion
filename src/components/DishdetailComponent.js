import React from "react";
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";
import AddComment from './AddCommentComponent.js';
import { Loading } from './LoadingComponent';
import {baseUrl} from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

function RenderDish(props){
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + props.dish.image} alt={props.dish.name} ></CardImg>
                    <CardBody>
                        <CardTitle>{props.dish.name}</CardTitle>
                        <CardText>{props.dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
}

function RenderComments({comments}){
        if(comments == null){
            return(
                <div></div>
            )
        }else{
            const comments1 = comments.map(c => (
                <div key={c.id} className="my-3">
                    <div>{c.comment}</div>
                    <div>--{c.author}, 
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(c.date))}
                    </div>
                </div>
            ));
            return(
                <div>
                    <h4>Comments:</h4>
                    {comments1}
                </div>
            )
        }
    }

const DishdetailComponent = props => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null)
        {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row mx-1 my-2">
                        <div className="col-12 col-md-6 ">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-6 List-unstyled bg-light">
                            <RenderComments comments={props.comments} /> 
                            <AddComment dishId={props.dish.id} postComment={props.postComment} />
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

export default DishdetailComponent;