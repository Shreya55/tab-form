// 40 mins for this question
// ask the interviwer -> what kind of validation is required, what should we do on submit
// tell the interviwer that you will use a config driven approach and manage a central state for the form

import React, { useState } from 'react'
import Profile from "./Profile"
import Interests from "./Interests"
import Settings from "./Settings"
import './TabForm.css'

export default function TabForm() {
    const [activeTab, setActiveTab] = useState(0)

    const [formData, setFormData] = useState({
        name: '',
        age: null ,
        email: '',
        interests: [],
        theme: ''
    })

    const [errors, setErrors] = useState({})
    const tabs = [ //config driven ui
        {
            name: 'Profile',
            component: Profile,
            validate: () => {
                const err = {}
                if(!formData.name || formData.name.length < 3) {
                    err.name = 'Name is required'
                }
                if(!formData.age || formData.age < 18) {
                    err.age = 'Age is required'
                }
                if(!formData.email || !formData.email.includes('@')) {
                    err.email = 'Email is required'
                }
                setErrors(err)
                return err.name || err.age || err.email ? false : true
            }
        },
        {
            name: 'Interests',
            component: Interests,
            validate: () => {
                const err = {}
                if(formData.interests.length === 0) {
                    err.interests = 'At least one interest is required'
                }
                setErrors(err)
                return err.interests ? false : true
            }
        },
        {
            name: 'Settings',
            component: Settings,
            validate: () => {
                return true
            }
        }
    ]
    const ActiveTabComponent = tabs[activeTab].component;
    const handleNextClick = () => {
        if(tabs[activeTab].validate()) setActiveTab((prev) => prev + 1)
    }
    const handlePrevClick = () => {
        if(tabs[activeTab].validate()) setActiveTab((prev) => prev - 1)
    }
    const handleSubmitClick = () => {
        console.log(formData)
    }


    return (
    <div>
        <div className="heading-container">
            {tabs.map((t, index) => {
                return (
                    <div key={index} className="heading" onClick={() => setActiveTab(index)}>
                        {t.name}
                    </div>
                );
            })}
        </div>
        <div className='tab-container'>
            <ActiveTabComponent data={formData} setFormData={setFormData} errors={errors}/>
        </div>
        <div>
            {activeTab > 0 && <button onClick={handlePrevClick}>Prev</button>}
            {activeTab < tabs.length-1 && <button onClick={handleNextClick}>Next</button>}
            {activeTab === tabs.length-1 && <button onClick={handleSubmitClick}>Submit</button>}
        </div>
    </div>
  )
}
