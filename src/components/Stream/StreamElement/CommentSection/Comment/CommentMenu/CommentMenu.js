import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './CommentMenu.module.css';
import TrashOpen from './TrashOpen.svg';
import TrashClosed from './TrashClosed.svg';

import * as actions from '../../../../../../store/actions/index';

class CommentMenu extends Component {

    state ={
        trashOpen: false,
        deleteCommentOpen: false
    }


    render() {
        return(
            <div className={classes.CommentMenu}>
                {/* <div className={classes.MenuItem}>screenshot mode </div> */}
                {/* <div className={classes.Seperator}>|</div>  */}
                { !this.props.userComment && this.props.token ? <div className={classes.MenuItem}>report</div> : null}
                { !this.state.deleteCommentOpen 
                    ? this.props.userComment && this.props.token
                        ? <img 
                            src={this.state.trashOpen ? TrashOpen : TrashClosed} 
                            alt='' 
                            className={classes.Trash}
                            onMouseOver={() => this.setState({trashOpen: true})} 
                            onMouseOut={() => this.setState({trashOpen: false})}
                            onClick={() => this.setState({deleteCommentOpen: true})}/>
                        : null
                    : null }
                { this.state.deleteCommentOpen 
                    ? <div className={classes.DeleteDialog}>Delete Comment? 
                        <button className={classes.YesButton} onClick={() => this.props.onDeleteComment(this.props.dropId, this.props.commentId)}>yes</button>
                        <button className={classes.NoButton} onClick={() => this.setState({deleteCommentOpen: false})}>no</button>
                      </div>
                    : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteComment: (dropId, commentId) => dispatch(actions.deleteComment(dropId, commentId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentMenu);