
import './App.css';
import { useState} from 'react';


function App() {

  const [textBoxcounter,setTextBoxcounter] = useState('');
  const [textBoxInfos,setTextBoxInfos] = useState('');
  const [result, setResult] = useState({positions: [], total: 0}) 
  const [allChecked, setAllChecked] = useState(false) 


  const handleTextBoxGenerator =()=>{
    setTextBoxInfos([])
    for (let i= 0;  i<textBoxcounter ; i++){
      setTextBoxInfos(prevState =>(
       [...prevState,{position:i , value:'' , status:false}]
      ))
    }
  }
  const handleGetInputValue =(value,position) =>{
    const prevData =textBoxInfos;
    prevData[position].value = value;
    setTextBoxInfos(prevData)
    console.log(textBoxInfos)
  }
const handleGetTotalNumber =(status,position)=>{
const prevData=textBoxInfos;
const resultData={positions :[],total:0}
prevData[position].status=status;
setTextBoxInfos(prevData)

  textBoxInfos.map((textBox, index) => {
    if(textBox.status){
      resultData.total+=Number(textBox.value);
      resultData.positions.push(index+1)
    }else{
      setAllChecked(false)
    }
  })
setResult(resultData)
}

const handleAllChecked = (status) => {
  const resultData ={positions: [], total: 0}
  const prevData = textBoxInfos;
  if(status){  
    textBoxInfos.map((textBox, index)=> { 
        prevData[index].status = status;
        resultData.total+= Number(textBox.value);
        resultData.positions.push(index+1) 
    })
    setAllChecked(true)
  }else{
    prevData.map((item, index) => prevData[index].status = false) 
    setAllChecked(false)
  }
  setResult(resultData)
  setTextBoxInfos(prevData)
}







  return (
    <div className="App">
      <div className="TextBox-container">
        <div className="TextBox-Head">
          <div className="textBox-Input-Box">
              <lebel>No of TextBox : </lebel>
              <input onChange={(event)=>{setTextBoxcounter(event.target.value)}} type={'text'}/>

          </div>
            <div className="TextBox-Submit-Box">
              <button onClick={handleTextBoxGenerator} type="button">Add textBox</button>
            </div> 
        </div>
        {!!textBoxInfos.length &&
        <div className="TextBox-Body">
            <div className="All-TextBox-Checked">
            <input type='checkbox'checked={allChecked} onChange={(event)=> {handleAllChecked(event.target.checked)}}  id='allcheck'/>
           <label htmlFor="allcheck">All Check</label>
            </div>
            <div className="TextBox-Item-List">
              {
                textBoxInfos.map((textBox, index)=>{
                  return (
                    <div key ={index} className='TextBox-Item'>
                      <input type={'checkbox'} checked={textBox.status} onChange={(event)=>{handleGetTotalNumber(event.target.checked ,index)}} id={`TextBoxItemCheck${index}`}/>
                      <input type={'text'} onChange={(event)=>{handleGetInputValue(event.target.value,index)}} id='text-item-input'/>

                    </div>
                  );
                })
              }

            </div>
            <div className='TextBox-Output-Container'>
                Output is: Selected {result?.positions.length != textBoxInfos.length ? result?.positions.length : `all ${result?.positions.length}`  } item{result?.positions.length> 1 ? 's': ''}. There position is {result?.positions.map(position => position + ',')} and total Number is {result.total} 
            </div>
          </div>
        }
      </div>
      
    </div>
  );
}

export default App;
