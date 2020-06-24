import React from 'react';
import Left_side_panel from "./Left_side_panel";
import Right_side_panel from "./Right_side_panel";
import Main_panel from "./Main_panel";

function Main_content() {
    return (
        <section className="main-content">
          <Left_side_panel/>
          <Main_panel/>
          <Right_side_panel/>
        </section>
        );
    }

export default Main_content;
