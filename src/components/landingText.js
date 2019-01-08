import React from 'react';

export default function LandingText(props){
    if(props.showMe){
        return (<span className={`innerlist ${props.landing}`} onClick={()=>props.onClick(props.showMe)}>{props.answer}</span>);
    }
    else {
        return (<span className={`${props.landing} underline ${props.landingPart2}`} onClick={()=>props.onClick(props.showMe)}>{props.question}</span>);
    }
}
