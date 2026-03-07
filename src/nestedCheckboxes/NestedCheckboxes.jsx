// display nested checkboxes from json file
// manage a central state for storing checked values in {key:value} pairs
// if parent is checked then check all its children

import { useState } from 'react'
import data from './data.json'
import ListNestedCheckboxes from './ListNestedCheckboxes'

export default function NestedCheckboxes(){

    const[checked, setChecked] = useState({})

    return <div>
        <h1>Nested Checkboxes</h1>
        <ListNestedCheckboxes data={data} checked={checked} setChecked={setChecked}/>
    </div>
}