import React, { Component } from 'react';

import * as classes from './Rectangle.module.css';



class Rectangle extends Component {

    state = {
        selected: false,
        height: 200,
        width: 200, 
        posX: 200,
        posY: 200,

        text: ''
    }

    onTextInput = (e) => {
        this.setState({text: e.target.value});
    }

    inputMouseDown = (e) => {
        console.log('imput mouse down')
        e.stopPropagation();
    }

    rectangleMouseDown = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.select(e, this.props.elementId);
        const prevX = this.state.posX - e.clientX;
        const prevY = this.state.posY - e.clientY;
        const mousemove = (e) => {
            const newX = prevX + e.clientX;
            const newY = prevY + e.clientY;
            this.setState({posX: newX, posY: newY})
        }
        const mouseup = (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);
        }
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);
    }

    rectangleClick = (e) => {
    }
    
    cornerMouseDown = (e, dir) => {
        e.preventDefault();
        e.stopPropagation(); 
        const prevWidth = this.state.width;
        const prevHeight = this.state.height;
        const prevLeft = this.state.posX;
        const prevTop = this.state.posY;

        const mouseStartX = e.clientX;
        const mouseStartY = e.clientY;

        const mousemove = (e) => {
            let newWidth = prevWidth;
            let newHeight = prevHeight;
            let newLeft = prevLeft;
            let newTop = prevTop;

            const diffX = e.clientX - mouseStartX;
            const diffY = e.clientY - mouseStartY;

            switch(dir) {
                case 'E': 
                    newWidth += diffX;
                    break;
                case 'S': 
                    newHeight += diffY; 
                    break; 
                case 'W': 
                    newWidth -= diffX;
                    newLeft += diffX;
                    break;    
                case 'N': 
                    newHeight -= diffY;
                    newTop += diffY;
                    break;                 
                case 'SE':
                    newWidth += diffX; 
                    newHeight += diffY; 
                    break; 
                case 'NE':
                    newWidth += diffX; 
                    newHeight -= diffY; 
                    newTop += diffY; 
                    break; 
                case 'SW':
                    newWidth -= diffX; 
                    newHeight += diffY; 
                    newLeft += diffX; 
                    break;
                case 'NW':
                    newWidth -= diffX; 
                    newHeight -= diffY; 
                    newLeft += diffX; 
                    newTop += diffY; 
                    break; 
                default: console.log('Invalid dir', dir)
            }
            this.setState({
                width: newWidth, 
                height: newHeight,
                posX: newLeft,
                posY: newTop,
            })
        }
        const mouseup = (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            console.log('removing Listener: ', dir);
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);
        }
        console.log('adding   Listener: ', dir);

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);
    }

    getResizeHandlers = () => {
        if(!this.props.selected) return null;
        return [
            <div key={`${this.props.elementId}-NW`} className={`${classes.Corner} ${classes.NW}`} onMouseDown={(e) => this.cornerMouseDown(e, 'NW')}></div>,
            <div key={`${this.props.elementId}-SW`} className={`${classes.Corner} ${classes.SW}`} onMouseDown={(e) => this.cornerMouseDown(e, 'SW')}></div>,
            <div key={`${this.props.elementId}-NE`} className={`${classes.Corner} ${classes.NE}`} onMouseDown={(e) => this.cornerMouseDown(e, 'NE')}></div>,
            <div key={`${this.props.elementId}-SE`} className={`${classes.Corner} ${classes.SE}`} onMouseDown={(e) => this.cornerMouseDown(e, 'SE')}></div>,
            <div key={`${this.props.elementId}-E`} className={`${classes.Edge} ${classes.E}`} onMouseDown={(e) => this.cornerMouseDown(e, 'E')}></div>,
            <div key={`${this.props.elementId}-N`} className={`${classes.Edge} ${classes.N}`} onMouseDown={(e) => this.cornerMouseDown(e, 'N')}></div>,
            <div key={`${this.props.elementId}-S`} className={`${classes.Edge} ${classes.S}`} onMouseDown={(e) => this.cornerMouseDown(e, 'S')}></div>,
            <div key={`${this.props.elementId}-W`} className={`${classes.Edge} ${classes.W}`} onMouseDown={(e) => this.cornerMouseDown(e, 'W')}></div>,
        ]
    }

    getStyles = () => {
        return {
            height: `${this.state.height}px`, 
            width: `${this.state.width}px`,
            left: `${this.state.posX}px`,
            top: `${this.state.posY}px`,
            border: this.props.selected ? '1px solid #555555' : 'none'
        }
    }

    render() {  
        return(
                <div className={classes.Rectangle}
                    onMouseDown={this.rectangleMouseDown}
                    onClick={this.rectangleClick}
                    style={this.getStyles()}
                >
                    <input 
                        type='text' 
                        id={`${this.props.elementId}-input`}
                        className={classes.TextInput} 
                        placeholder='textInput' 
                        onMouseDown={this.inputMouseDown}
                        onChange={this.onTextInput}
                        value={this.state.text}/>
                    {this.getResizeHandlers()}
                </div>
        )
    }
}

export default Rectangle;