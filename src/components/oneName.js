import React from 'react';

export function OneName(props){
    if(props.title != null){
    return (<div className='innerlist'>A new event: {props.title} was successfully created</div>);
    }
    else return (<div></div>);
}