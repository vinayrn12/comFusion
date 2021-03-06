import React from "react";
import { Card, CardImg, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";

function RenderMenuItem({dish}){
    return(
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg src={baseUrl + dish.image} alt={dish.name}>
                </CardImg> 
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    )
}

const Menu = ({dishes}) => {
        const menu = dishes.dishes.map((dish) => {
            return(
                <div key={dish.id} className="col-10 col-md-6 mt-1">
                    <RenderMenuItem dish={dish}/>
                </div>
            );
        });
        if(dishes.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(dishes.errMsg){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{dishes.errMsg}</h4>
                        </div>
                    </div>
                </div> 
            )
        }
        else if(dishes.dishes != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h4>Menu</h4>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                    <div className="row">
                    </div>
                </div>
        )}
        else
            return(
                <div></div>
            )
}

export default Menu;