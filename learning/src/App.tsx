import './App.css'
import AGgridPOC from './components/AGgridPOC'
import HighChartPOC from './components/HighChartPOC'

function App() {

  return (
    <>
    <div className='m-3 flex gap-[10vh] flex-col p-1 w-full '>
      <AGgridPOC />
      <hr className='border-[3px] rounded-md border-red-500' />
      <HighChartPOC/>
    </div>
     
    </>
  )
}

export default App
