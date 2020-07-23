import React, {useState, useEffect} from 'react';
import {Doughnut,HorizontalBar} from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function Calorie_summary() {
    const [chartData,setChartData] = useState({
        
        labels: ['Protein:', 'Carbohydrates', 'Fats', 'Total'],
        datasets:[{label:'population',data:[61759,181045,153060],
        backgroundColor:["rgba(255,0,0,0.6)","rgba(0,0,255,0.6)","rgba(0,255,0,0.6)"]}]
      }
    )
    const [data, setData] = useState([0,0,0])
    const [doughnutData, setDoughnutData] = useState([0,0,0])
    const [label, setLabel] = useState('calories')
    const [chartLabel, setChartLabel] = useState(['Protein', 'Carbohydrates', 'Fats']);
    const [colors, setColors] = useState(["rgba(255,0,0,0.6)","rgba(0,0,255,0.6)","#00C853","#f5ab3b"])

    const dayJournal = useSelector(state=>state.chosenDayJournal)

    const changeMacros = () =>{
      // setData(dayJournal[0].foods.map(x=>[x.protein, x.carbohydrates, x.fat]))
      // console.log(dayJournal[0].foods.map(x=>x.protein).reduce((sum,x)=>sum+x))
      try{
        const todaysMacros = dayJournal[0].foods.map(x=>{return{protein:x.protein, carbohydrates:x.carbohydrates, fat:x.fat}});
        const protein = todaysMacros.map(x=>x.protein).reduce((sum,x)=>sum+x);
        const carbohydrates = todaysMacros.map(x=>x.carbohydrates).reduce((sum,x)=>sum+x);
        const fat = todaysMacros.map(x=>x.fat).reduce((sum,x)=>sum+x);
        setData([Math.round(protein*4),Math.round(carbohydrates*4),Math.round(fat*9),Math.round(protein*4+carbohydrates*4+fat*9)])
        setDoughnutData([protein*4,carbohydrates*4,fat*9])
        setChartLabel([`Protein: ${Math.round(protein)}g`,`Carbohydrates: ${Math.round(carbohydrates)}g`,`Fat: ${Math.round(fat)}g`])
      }catch(e){setData([0,0,0])}
    }
    useEffect(changeMacros,[dayJournal])

    const getCharts = () =>{
      if(data != [0,0,0] && dayJournal.message != 'day not found')
      return(
              <div className="calorie-summary">
                <div className="calorie-summary-doughnut-container">
                    <Doughnut
                    data={{...chartData,
                      labels:chartLabel,
                      datasets:[{
                      label:"calories:",
                      data:doughnutData,
                      backgroundColor:colors,
                    }]}}
                    options={{responsive:true,
                      maintainAspectRatio:true,
                      legend: {
                          display: false // hides the legend
                        },
                      tooltips: {
                        enabled: false // hides the tooltip.
                      }
                      }}
                    />
                </div>
    
                <div className="calorie-summary-bars-container">
                <HorizontalBar
                data={{...chartData, 
                  labels:chartLabel,
                  datasets:[{
                  label:label,
                  data:data,
                  backgroundColor:colors,
                }]}}
                options={{maintainAspectRatio:false,
                  legend: {
                  display: false // hides the legend
                },
                tooltips: {
                  enabled: true // hides the tooltip.
                },
                scales: {
                  xAxes: [{
                    display: true, // hides the horizontal scale
                    stacked: false, // stacks the bars on the x axis
                    ticks: {
                      beginAtZero: true
                    },
                  }],
                  yAxes: [{
                    display: false, // hides the vertical scale
                    stacked: true, // stacks the bars on the y axis
                    
                  }],
                  responsive: true
                }}}
                />
                </div>
            </div>)
            else
                return(
                  <h3 className="calorie-no-food">No foods today</h3>
                //   <div className="calorie-summary">
                //     <div className="calorie-summary-doughnut-container">
                //         <Doughnut
                //         data={{...chartData, datasets:[{
                //           label:label,
                //           data:[100,100,100],
                //           backgroundColor:colors,
                //         }]}}
                //         options={{responsive:true,
                //           maintainAspectRatio:true,
                //           legend: {
                //               display: false // hides the legend
                //             },
                //           tooltips: {
                //             enabled: false // hides the tooltip.
                //           }
                //           }}
                //         />
                //     </div>
        
                //     <div className="calorie-summary-bars-container">
                //     <HorizontalBar
                //     data={{...chartData, datasets:[{
                //       label:label,
                //       data:[100,100,100],
                //       backgroundColor:colors,
                //     }]}}
                //     options={{maintainAspectRatio:false,
                //       legend: {
                //       display: false // hides the legend
                //     },
                //     tooltips: {
                //       enabled: false // hides the tooltip.
                //     },
                //     scales: {
                //       xAxes: [{
                //         display: false, // hides the horizontal scale
                //         stacked: true // stacks the bars on the x axis
                //       }],
                //       yAxes: [{
                //         display: false, // hides the vertical scale
                //         stacked: true // stacks the bars on the y axis
                //       }],
                //       responsive: true
                //     }}}
                //     />
                //     </div>
                // </div>
                )
    }
  
    return (
      <>
        {getCharts()}
      </>
    );
}



export default Calorie_summary;
