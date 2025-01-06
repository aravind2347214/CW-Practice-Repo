import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { SERIES_A, SERIES_B } from '../data/housing';


const options: Highcharts.Options = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Average House Prices by Area (2015-2024)'
  },
  xAxis: {
    categories: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    title: {
      text: 'Year'
    }
  },
  yAxis: {
    title: {
      text: 'Price (USD)'
    },
    labels: {
      formatter: function(this: Highcharts.AxisLabelsFormatterContextObject): string {
        return '$' + this.value.toLocaleString();
      }
    }
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'Area A',
    type: 'column', 
    data: SERIES_A
  }, {
    name: 'Area B',
    type: 'column', 
    data: SERIES_B
  }

]
};
function HighChartPOC() {
  return (
    <div className={`bg-gray-100 p-5 rounded-[6px]`}>
    <div className='px-2 mb-10 text-5xl font-bold text-left text-black'>
      House Prices Comparison
    </div>
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  </div>
  )
}

export default HighChartPOC
