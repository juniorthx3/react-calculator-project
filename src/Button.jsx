import React from 'react';

class Button extends React.Component{
    constructor(props){
      super(props);
      this.operator=this.operator.bind(this);
    }
    operator(val){
       return !isNaN(val) || val === ".";
    } 
    
    render(){
      return(
          <button id={this.props.id} className={this.operator(this.props.value) ? null : "operator"} onClick={()=>this.props.handleClick(this.props.value)}>
          {this.props.value}
          </button>
      );
    }
  }

  export default Button;