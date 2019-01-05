import React from 'react';

export default function(props){
    return (<form name="filter" className='lower' onSubmit={(e)=>{e.preventDefault();props.submitProp(e)}}>
    <label htmlFor="patientId" >Person:</label>
    <select name="patientId" id="patientId">
        <option value='false'>Do not filter by Person</option>
        {props.displayNamesProp}
    </select>
    <p>
   <label htmlFor="medId" >Medication:</label>
    <select name="medId" id="medId">
        <option value='false'>Do not filter by Medication</option>
        {props.displayMedsProp}
    </select>
    </p>
    <button type="submit"><i className="fas fa-filter"></i></button>
</form>);
}