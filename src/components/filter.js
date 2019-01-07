import React from 'react';

export default function(props){
    return (<form name="filter" className='lower' onSubmit={(e)=>{e.preventDefault();props.submitProp(e)}}>
    <label className='inputGroup' htmlFor="patientId" >Person:
    <select name="patientId" id="patientId">
        <option value='false'>Do not filter by Person</option>
        {props.displayNamesProp}
    </select>
    </label>
    <p>
   <label className='inputGroup' htmlFor="medId" >Medication:
    <select name="medId" id="medId">
        <option value='false'>Do not filter by Medication</option>
        {props.displayMedsProp}
    </select>
    </label>
    </p>
    <button type="submit"><i className="fas fa-filter"></i></button>
</form>);
}