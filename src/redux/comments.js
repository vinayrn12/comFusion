import * as ActionTypes from "./ActionTypes";

export const Comments = (state={
    errMsg: null,
    comments: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments:state.comments.concat(comment)}
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMsg: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMsg: action.payload, comments: []};
        default: 
            return state;
    }
}