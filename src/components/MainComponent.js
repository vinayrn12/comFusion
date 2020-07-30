import React, { Component } from 'react';
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import Dishdetail from "./DishdetailComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from "../redux/ActionCreators";
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment ) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});


class Main extends Component{

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
  }
 
  render(){
    const DishwithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    errMsg = {this.props.dishes.errMsg}
                    isLoading = {this.props.dishes.isLoading}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMsg = {this.props.comments.errMsg}
                    postComment={this.props.postComment}
        />
      );
    };
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMsg = {this.props.dishes.errMsg}
              leader={this.props.leaders.filter(leader => leader.featured)[0]}
              promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} 
              promoLoading = {this.props.promotions.isLoading}
              promoErrMsg = {this.props.promotions.errMsg}/>
      )
    }
    return(
      <div>
        <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300} >
              <Switch>
                  <Route path="/home" component={HomePage}></Route>
                  <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}></Route>
                  <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                  <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                  <Route path="/menu/:dishId" component={DishwithId} />
                  <Redirect to="/home"></Redirect>
                </Switch>
            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
