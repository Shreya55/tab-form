import React, {useEffect, useState} from 'react'
import '../ProgressBar.css'

const MemoizedProgressBar = React.memo(function ProgressBar({progress}) {
    const [animatedProgress, setAnimatedProgress] = useState(0)

    // Sanity checks: clamp progress between 0 and 100
    const clampedProgress = Math.min(100, Math.max(0, progress || 0)) 
    //if progress is NaN then set it to 0, and if it is more than 100 then set it to min(100, val passed as more than 100) ie. 100

    useEffect(() => {
        setTimeout(() => {
            setAnimatedProgress(clampedProgress)
        }, 100)
    }, [clampedProgress])

  return (
    <div className='outer'>
        <div className="inner" style={{transform : `translateX(${animatedProgress-100}%)`}}
            role='progressbar' aria-valuenow={clampedProgress} aria-valuemin='0' aria-valuemax='100'>
            {Math.round(clampedProgress)} %
        </div>
    </div>
  )
})

export default MemoizedProgressBar