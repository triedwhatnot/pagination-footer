import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App({totalPages = 50, itemsCount = 10}) {
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
            Array(itemsCount).fill(0).map((el, idx) => {

              if(idx === 0 || idx === (itemsCount - 1)){
                let key = idx === 0 ? "1" : `${totalPages}`;
                return <ListItem key={key} text={key} setActivePage={setActivePage} isActive={ key == activePage} />
              }
              else if(activePage <= (itemsCount - 2 - 1)){
                // active page in first few elements
                if(idx <= (itemsCount - 2 - 1)){ 
                  let key = idx+1;
                  return <ListItem key={key} text={key} setActivePage={setActivePage} isActive={ key == activePage} />
                }
                else{
                  return <ListItem key={"first-dots"} text={"..."} isActive={false} />
                }
              }
              else if(activePage >= (totalPages - (itemsCount - 2 - 1 - 1))){
                // active page in last few elements
                // 50 - (10 - 4) = 44 45 46 47 48 49 50
                // 2 -> 43
                // 50 = 50 - ( (10 -1) 9 )
                if(idx >= 2){
                  let key = totalPages - ((itemsCount - 1) - idx);
                  return <ListItem key={key} text={key} setActivePage={setActivePage} isActive={ key == activePage} />
                }
                else{
                  return <ListItem key={"first-dots"} text={"..."} isActive={false} />
                }
              }
              else{
                // active page in somewhere middle
                if(idx >= 2 && idx <= (itemsCount - 2 - 1)){
                  // 2 -> activePage
                  // activePage = activePage + (idx - 2)
                  // 3 -> activePage + 1
                  let key = activePage + (idx - 2);
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