// ask - the progress bar would show the progress as provided by the user?

import React, {useEffect, useState} from 'react'
import './ProgressBar.css'

export default function ProgressBar({progress}) {
    const [animatedProgress, setAnimatedProgress] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setAnimatedProgress(progress)
        }, 100)
    }, [progress])

  return (
    <div className='outer'>
        <div className="inner" style={{width: `${animatedProgress}`}}
            role='progressbar' aria-valuenow={progress} aria-valuemin='0' aria-valuemax='100'>
            {animatedProgress}
        </div>
    </div>
  )
}
