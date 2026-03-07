export default function PasswordStrength({password}) {
    
    function passwordStrengthIndicator(){
        const passwordLength = password.length
        if(passwordLength < 1) return ""
        else if(passwordLength<7) return "Poor"
        else if(passwordLength>10 && passwordLength<15) return "Strong"
        else return "Very Strong"
    }
    
    const passwordStrength = passwordStrengthIndicator()
    if(!passwordStrength) return <></>

    return <>
        <div className="strength">
            Strength: <span>{passwordStrength}</span>
        </div>
    </>
}