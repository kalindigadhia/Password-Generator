import {useState , useCallback , useEffect,useRef } from "react"
import './App.css'
import './index.css'

function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed ,setCharAllowed]=useState(false)
  const[password,setPassword]=useState("")
  
//useRef hook
const passwordRef = useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass =""//password is empty string at the start
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"//all the characters that we want to use in our password
    if(numberAllowed){
      str = str + "0123456789" //if number is allowed then we add numbers to the string
    }
    if(charAllowed){
      str = str +"!@#$%^&*" //if special characters are allowed then we add them to the string
    }
    for(let i=1 ; i <= length ; i++){
      let char = Math.floor(Math.random() * str.length + 1 )// math.random() gives us a random number between 0 and 1 which are decimals and we multiply it with the str.length to get a random index of the string and we add 1 to it because we want to start from 1 instead of 0 ex: 1 to 8 instead of 0 to 7 and math.floor() decimals the number to get an integer
      pass = pass + str.charAt(char) //char will give us the index of string so we use charAt() to get character at that index and when we write pass += str.charAt(char) it will not overwrite the value of the pass 
    
    }
    setPassword(pass) //read the generated password and set it to the state

  },[length,numberAllowed,charAllowed,setPassword]) //if i give password instead of setpassword then it goes to infinte loop , if any thing change in dependency then it again run so , when there is a change in the setpassword then only change the password and it is not compulsory to give the setpassword

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef?.current.select() // this will select the oassword text so that the user sees that what is copied in the clipboard
    //passwordRef?.current.setSelectionRange(0,3) // this will select only first 3 index value
    window.navigator.clipboard.writeText(password) //in server we dont have window object so it runs on core react only
  },[password])

  useEffect(() =>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  
  return (
    <div>
    <div className="bg-slate-400 w-4/6 h-48 rounded-xl p-4 mx-48 my-20  ">
      <h1 className="text-black py-2 text-3xl font-semibold font-mono">Password Generator</h1>
      <div className="flex shadow rounded-xl overflow-hidden mb-4">
        <input type="text" 
             className="bg-black text-xl text-white w-4/5 h-14 p-4 " 
             placeholder="password"
             value={password} //values are generated in the state and we want to show it in the input field
             readOnly //this will prevent the user from editing the input field
             ref={passwordRef}
             />
             <button onClick={passwordGenerator} className=" bg-black text-xl shrink-0 px-4" >🔄</button>
             <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-xl text-white px-8 shrink-0 hover:bg-blue-800 transition duration-200 ">Copy</button>
      </div>
    <div className=" font-mono flex gap-x-10 " >
      <div className="flex gap-x-2">
        <input type="range"
               min={8}
               max={100}
               value={length}
               className="cursor-pointer"
               onChange={(e) =>{setLength(e.target.value)}} //we can not give onChange directly to the input field, i have to give event as a parameter and if i pass the event then it calls the function and it will update the length state and then it will generate the password again with the new length
        />
        <label>length:{length}</label>
        </div>
        <div className="flex gap-x-2">
        <input type="checkbox"
                className="cursor-pointer"
                defaultChecked={numberAllowed}
                onChange={()=>{ 
                  setNumberAllowed((prev) => !prev); 
                }}
        />
        <label>Numbers</label>
        </div>
        <div className="flex gap-x-2">
          <input type="checkbox"
                 className="cursor-pointer"
                 defaultChecked={charAllowed}
                 onChange={()=>{
                  setCharAllowed((prev) => !prev)
                 }}
          />
          <label>Special-Characters</label>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App
