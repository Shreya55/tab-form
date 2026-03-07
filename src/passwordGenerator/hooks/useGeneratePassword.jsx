import { useState } from "react";

export default function UseGeneratePassword(){

    const[password, setPassword] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    function generatePassword(checkboxData, length){
        let charset="", generatedPassword=""

        const selectedOptions = checkboxData.filter((item) => item.state)

        if(selectedOptions.length === 0){
            setErrorMessage("Please select atleast one option")
            setPassword("")
            return
        }

        selectedOptions.map((option) => {
            switch(option.title){
                case "Include Uppercase letters":
                    charset+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    break;
                case "Include Lowercase letters":
                    charset+= "abcdefghijklmnopqrstuvwxyz"
                    break;
                case "Include numbers":
                    charset+= "0123456789"
                    break;
                case "Include symbols":
                    charset+= "!@#$%^&*()~_+{}:[]\;'.,?/"
                default:
                    break;
            }
        })

        for(let i=0; i<length; i++){
            const randomIndex = Math.floor(Math.random() * charset.length)
            generatedPassword+= charset[randomIndex]
        }

        setPassword(generatedPassword)
        setErrorMessage("")
    }

    return {password, errorMessage, generatePassword}

}