//ask -> where do you get the data for the file explorer? -> else create your own data in data.json file
// data schema -> [{}, {}, {}] --> each object will represent a file/folder
// 1) show nested data
// 2) expand/collapse only the folders
// 3) add/delete files/folder

import { useState } from 'react'
import json from './data2.json'
import List from './List'

export default function FileExplorers(){

    const[data, setData] = useState(json)

    const addFolder = (parentId) => {
        const name = prompt('Please enter the folder name')

        const updateTree = (list) => {
            return list.map((node) => {
                if(node.id === parentId){
                    return{
                        ...node,
                        children: [...node.children, {name: name, id: Date.now().toString(), isFolder: true, children:[]}]
                    }
                }
                if(node.children){
                    return{
                        ...node,
                        children: updateTree(node.children)
                    }
                }
                return node
            })
        }

        setData((prev) => updateTree(prev))
    }

    const deleteNode = (itemId) => {

        const updateTree = (list) => {
            return list.filter((node) => node.id !== itemId).map((node) => {
                if(node.children) return {...node, children: updateTree(node.children)}
                return node
            })
        }

        setData((prev) => updateTree(prev))
    }

    console.log(data)

    return <div>
        <h1>File Explorer</h1>
        <List data={data} addFolder={addFolder} deleteNode={deleteNode}/>
    </div>
}