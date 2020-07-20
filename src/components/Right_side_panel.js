import React from 'react';
import CalSummary from './Right_side_panel/Calorie_summary'

export default function Right_side_panel(){          
    return(
        <>
        <div className="side-panel right-side-panel">
        <div className="right-side-panel-bar">
            <p>Daily Summary</p>
        </div>
        
          <CalSummary/>
      </div>
      </>
    )
}
