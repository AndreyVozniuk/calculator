import React, {useState} from 'react'
import {negativeNumber} from './helper'
import './App.css'

const calcLayout = [
  'AC', 'C', '-/+', '÷',
  '7',  '8', '9',   '×',
  '4',  '5', '6',   '-',
  '1',  '2', '3',   '+',
  '0',  '.', '='
]

const initialExpression = {
  rNum: '',
  lNum: '', 
  calculationSymbol: '' 
}

const calculationSymbols = ['+', '-', '×', '÷']

function App() {
  const [expression, setExpression] = useState(initialExpression)
  const [inputNum, setInputNum] = useState('0')

  function determineExpression(calculationSymbol) {
    if(!expression.lNum){
      setExpression({rNum: '0', lNum:inputNum, calculationSymbol})
      setInputNum('0')
    }
  }

  function calcResult(){
    let result
    if(expression.rNum && expression.lNum){
      switch (expression.calculationSymbol) {
        case '+':
          console.log('case', '+')
          result = Number(expression.lNum) + Number(inputNum)
          break
        case '-':
          result = Number(expression.lNum) - Number(inputNum)
          break
        case '×':
          result = Number(expression.lNum) * Number(inputNum)
          break
        case '÷':
          result = Number(expression.lNum) / Number(inputNum)
          break
        default: 
          return 'unknown calculation symbol'
      }
      setInputNum(String(result))
      setExpression(initialExpression)
    }
  }

  function onBtnClick(e) {
    let value = e.target.innerHTML

    if(inputNum === 'Infinity' && value !== 'AC'){   // I don`t confident that is a smart decision :D
      return
    }

    if(calculationSymbols.includes(value)){
      value = 'calculationSymbols'
    }

    switch (value) {
      case 'AC':
        setInputNum('0')
        setExpression(initialExpression)
        break
      case 'C':
        inputNum.length > 1 ? setInputNum(inputNum.slice(0, -1)) : setInputNum('0')
        break
      case '-/+':
        if(inputNum !== '0') setInputNum(negativeNumber(inputNum))
        break
      case '.':
        if(!inputNum.includes('.')) setInputNum(inputNum + value)
        break
      case '=':
        calcResult()
        break
      case 'calculationSymbols':
        determineExpression(e.target.innerHTML)
        break
      default:
        inputNum !== '0' ? setInputNum(inputNum + value) : setInputNum(value)
        break
    }
  }

  return (
    <div className='app'>
      <div className='calculator'>
        <div className='result'>
          <div>
            <span>{expression.lNum}</span> 
            {' '}
            <span>{expression.calculationSymbol}</span> 
            {' '}
            <span>{expression.lNum ? inputNum : expression.rNum}</span>
          </div>
          <div>{inputNum}</div>
        </div>
        <div className='buttons'>
          {
            calcLayout.map(el => {
              switch(el){
                case 'AC':
                  return <button className='button btn-pink' onClick={onBtnClick}>{el}</button>
                case '=':
                  return <button className='button last-el btn-yellow' onClick={onBtnClick}>{el}</button>
                default:
                  return <button className='button' onClick={onBtnClick}>{el}</button>
              }
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
