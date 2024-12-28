import './App.css'
import AGgridPOC from './components/AGgridPOC'
import HighChartPOC from './components/HighChartPOC'

function App() {

  return (
    <>
    <div className='m-3 flex gap-[100px] flex-col p-1 w-full '>
      <AGgridPOC/>
      <hr className='border-[3px] rounded-[6px] border-red-500' />
      <HighChartPOC/>
    </div>
     
    </>
  )
}

export default App
