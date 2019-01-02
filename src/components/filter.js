import React from 'react';

export default function(props){
    return (<form name="filter" onSubmit={(e)=>{e.preventDefault();props.submitProp(e)}}>
    <p><label htmlFor="patientId" >Person to filter: </label>
    <select name="patientId" id="patientId">
        <option value='false'>Do not filter by Person</option>
        {props.displayNamesProp}
    </select></p>
    <p><label htmlFor="medId" >Medication to filter: </label>
    <select name="medId" id="medId">
        <option value='false'>Do not filter by Medication</option>
        {props.displayMedsProp}
    </select></p>
    <button type="submit">Filter</button>
</form>);
}