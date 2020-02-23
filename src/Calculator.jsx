import React from 'react';
import ClearButton from './ClearButton';
import ClearOne from './ClearOne';
import EqualButton from './EqualButton';
import History from './History';
import Display from './Display';
import Button from './Button';

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      inputValue:0,
      outputValue:"",
      operator:"",
      lockOperator:false,
      lockDot:false
    }
    this.appendNumber=this.appendNumber.bind(this);
    this.clearAll=this.clearAll.bind(this);
    this.appendZeroNumber=this.appendZeroNumber.bind(this);
    this.calculate=this.calculate.bind(this);
  }

  appendNumber(number){
    let {lockOperator, inputValue}=this.state;
    if(inputValue !== 0){
        if(inputValue.length >= 30){
          return;
        }
      else
        {
            inputValue += number;
        } 
    }
    else{
       inputValue = number;
    }
    lockOperator=false;
    this.setState({inputValue, lockOperator});
  }

clearAll(){
  this.setState({ inputValue: 0, outputValue:"", operator:"", lockDot:false, lockOperator:false });
}

 appendZeroNumber(number){
  if(this.state.inputValue !==0){
    this.setState({ inputValue: this.state.inputValue + number});
  }
 }
  
  appendDot(){
      let {inputValue, lockDot}=this.state;
      if(!(/\./).test(inputValue) || lockDot===false){
          inputValue += ".";
      }
      lockDot=true;
      this.setState({ inputValue, lockDot});
  }
  
  selectOperator(appendOperator){
    let {inputValue, operator, lockOperator, lockDot}=this.state;
    lockDot=false;
    operator=appendOperator;
    switch(operator)
    {
      case "+": operator = "+";
      break;
      case "-": operator = "-";
      break;
      case "×": operator = "*";
      break;
      case "÷": operator = "/";       
      break;
      default: return;
    }
    if(inputValue !== "" && !lockOperator){
      inputValue+=operator;
    }
    else if(operator !=="-"){
        const newInput=inputValue.slice(0, inputValue.length - 1);
        inputValue = newInput;
        inputValue += operator;
    }
    else if(operator ==="-"){
      inputValue+=operator;
      if(/--/.test(inputValue)) return;
    }
    if(/[+][+]$/.test(inputValue) || /[*][*]$/.test(inputValue) || /[/][/]$/.test(inputValue)){
        inputValue=inputValue.slice(0, inputValue.length - 1);
      }
      if(/[+][*]$/.test(inputValue) || /[+][/]$/.test(inputValue)){
        inputValue=inputValue.replace(/[+][*]$/,"*").replace(/[+][/]$/,"/")
      }
      if(/[*][+]$/.test(inputValue) || /[*][/]$/.test(inputValue)){
        inputValue=inputValue.replace(/[*][+]$/,"+").replace(/[*][/]$/,"/")
      }
      if(/[/][+]$/.test(inputValue) || /[/][*]$/.test(inputValue)){
        inputValue=inputValue.replace(/[/][+]$/,"+").replace(/[/][*]$/,"*")
      }
    
      
      lockOperator=true;
    this.setState({inputValue, lockDot, lockOperator, operator});
    }
  
  calculate()
  {
    let {inputValue}=this.state;
    this.setState({inputValue: parseFloat(inputValue)})
    if(inputValue !== 0){
      while(/[*+-/]$/.test(inputValue)){
        inputValue=inputValue.slice(0,-1);
      }
      // eslint-disable-next-line
      this.setState({inputValue: eval((inputValue))});
      console.log(inputValue);
      this.setState({outputValue:inputValue +"="});
        
    }
  }
  
  render(){
    return( 
      <div className="container">
        <div className="calc-container">
          <div className="displayScreen">
          <History output={this.state.outputValue} />
          <Display input={this.state.inputValue} />
          </div>
        <div className="button-container">
          <div className="row">
            <ClearButton value="AC" id="clear" clearAll={this.clearAll} />
            <ClearOne value="C" clearOne={()=>this.setState({inputValue:0, operator:"", lockDot:"", lockOperator:false })} />
            <Button value="÷" id="divide" handleClick={this.selectOperator.bind(this)} />
          </div>
          <div className="row">
            <Button value="7" id="seven" handleClick={this.appendNumber} />
            <Button value="8" id="eight" handleClick={this.appendNumber} />
            <Button value="9" id="nine"  handleClick={this.appendNumber} />
            <Button value="×" id="multiply" handleClick={this.selectOperator.bind(this)} />
          </div>
          <div className="row">
            <Button value="4" id="four" handleClick={this.appendNumber} />
            <Button value="5" id="five" handleClick={this.appendNumber} />
            <Button value="6" id="six"  handleClick={this.appendNumber} />
            <Button value="+" id="add"  handleClick={this.selectOperator.bind(this)} />
          </div>
          <div className="row">
            <Button value="1" id="one" handleClick={this.appendNumber} />
            <Button value="2" id="two" handleClick={this.appendNumber} />
            <Button value="3" id="three" handleClick={this.appendNumber} />
            <Button value="-" id="subtract" handleClick={this.selectOperator.bind(this)}/>
          </div>
          <div className="row">
            <Button value="." id="decimal" handleClick={this.appendDot.bind(this)} />
            <Button value="0" id="zero" handleClick={this.appendZeroNumber} />
            <EqualButton value="=" id="equals" handleClick={()=>this.calculate()}/>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Calculator;