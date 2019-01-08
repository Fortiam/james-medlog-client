import React/*, { Component }*/ from 'react';

export default function LandingText(props){
    
    if(props.showMe){
        return (<span className={`innerlist ${props.landing}`} onClick={()=>props.onClick(props.showMe)}>{props.answer}</span>);
    }
    else {
        return (<span className={`innerlist ${props.landing} underline`} onClick={()=>props.onClick(props.showMe)}>{props.question}</span>);
    }
}
