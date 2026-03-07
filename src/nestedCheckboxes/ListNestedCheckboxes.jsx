import './nestedCheckboxes.css'

export default function ListNestedCheckboxes({data, checked, setChecked}){

    function handleChange(isChecked, item){
        setChecked((prev) => {
            const newState = {...prev, [item.id]: isChecked}

            const updateChildren = (item) => {
                item.children?.forEach((child) => {
                    newState[child.id] = checked
                    child.children && updateChildren(child)
                })
            }

            updateChildren(item) // if parent is checked then check all its children
            return newState
        })
    }

    console.log(checked)
    return <div>
        {data.map((item, index) => 
        <div className='list' key={index}>

            <input type="checkbox" checked={checked[item.id] || false} 
            onChange={(e) => handleChange(e.target.checked, item)}/>
            {item.name}

            {item.children && <ListNestedCheckboxes data={item.children} checked={checked} setChecked={setChecked}/>}

        </div>)}
    </div>
}