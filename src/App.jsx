import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({totalPages = 10}) {
  const [activePage, setActivePage] = useState(1);

  const handleArrowClick = (e, direction) => {
    if(direction === "left"){
      setActivePage(count => count - 1);
    }
    else{
      setActivePage(count => count + 1);
    }
  }

  return (
    <div className='flex items-center'>
        <button disabled={activePage === 1} onClick={(e) => {handleArrowClick(e, "left")}}>&#x2190;</button>
          <div className={`ml-2 mr-2 `}>
          {
            Array(7).fill(0).map((el, idx) => {

              if(idx === 0 || idx === 6){
                let key = idx === 0 ? "1" : `${totalPages}`;
                return <ListItem key={key} text={key} setActivePage={setActivePage} isActive={ key == activePage} />
              }
              else if(activePage <= 4){
                if(idx <= 4){
                  let key = idx+1;
                  return <ListItem key={key} text={key} setActivePage={setActivePage} isActive={ key == activePage} />
                }
                else{
                  return <ListItem key={"first-dots"} text={"..."} isActive={false} />
                }
              }
              else if(activePage >= 7){
                if(idx >= 2){
                  let key = totalPages - (6 - idx);
                  return <ListItem key={key} text={key} setActivePage={setActivePage} isActive={ key == activePage} />
                }
                else{
                  return <ListItem key={"first-dots"} text={"..."} isActive={false} />
                }
              }
              else{
                if(idx >= 2 && idx <= 4){
                  let key = idx === 2 ? activePage - 1 : ( idx === 3 ? activePage : activePage + 1);
                  return <ListItem key={key} text={key} setActivePage={setActivePage} isActive={ key == activePage} />
                }
                else{
                  return <ListItem key={idx === 1 ? "first-dots" : "second-dots"} text={"..."} isActive={false} />
                }
              }
            })
          }
          </div>
        <button disabled={activePage === totalPages} onClick={(e) => {handleArrowClick(e, "right")}}>&#8594;</button>
    </div>
  )
}

export default App;


function ListItem({text, setActivePage, isActive}){
  return (<span onClick={setActivePage ? ()=>{setActivePage(+text)} : undefined} className={`text-xl ml-4 ${isActive ? "border-white border-[1px] p-3 rounded-xl" : ""}`}>{text}</span>)
}




// active element - 1 2 3 4
// < 1 2 3 4 5 ... 10 >
// < 1 2 3 4 5 ... 10 >

// active element - 5
// < 1 ... 4 5 6 ... 10 >

// active element - 6
// < 1 ... 5 6 7 ... 10 >

// active element - 7 8 9 10
// < 1 ... 6 7 8 9 10 >

