import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [incNum, setIncNum] = useState(false)
  const [incChar, setIncChar] = useState(false)
  const [password, setPassword] = useState("")
  const reference = useRef(null)

  const passGen = useCallback(()=>{
    let pass = ""
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    if(incNum) str += "1234567890"
    if(incChar) str += "!@#$%^&*()_"

    for (let i = 1; i <= length; i++) {
      let rNum = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(rNum)
    }

    setPassword(pass)

  }, [length, incNum, incChar])

  const copRef = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    reference.current?.select()
    // reference.current?.setSelectionRange(0,9)
  },[password])

  useEffect(()=>{
    passGen()
  },[length, incNum, incChar])
 
  return (
    <>
     <h1 className='text-6xl'>password generator</h1>
     <div className='bg-slate-700 max-w-md rounded-lg text-white mx-auto my-9'>
       <div>
          <input 
          type='text' 
          value={password}
          className='outline-none w-full rounded-md px-2 py-2 text-black'
          placeholder='password'
          readOnly
          ref = {reference}
          ></input>
       </div>
       <button onClick={copRef}>copy</button>
      </div>
      <div className='flex max-w-md mx-auto'>
       <div >
         <input 
         type="range"
         min={6}
         max={20}
         value={length}
         onChange={(e)=>{setLength(e.target.value)}}
         // className='curser-pointer'
         />
        </div> 
        <label className='pl-5 text-lime-500'>length: {length}</label>
         <div className='pl-5'>
            <input 
            type="checkbox" 
            defaultChecked={incNum}
            onChange={()=>{setIncNum((prev)=>!prev)}}
            />
         </div>
         <label className='pl-5 text-red-500'>number</label>
         <div className='pl-5'>
            <input 
            type="checkbox" 
            defaultChecked={incChar}
            onChange={()=>{setIncChar((prev)=>!prev)}}
            />
         </div>
         <label className='pl-5 text-red-500'>character</label>
      </div>
    </>
  )
}

export default App
