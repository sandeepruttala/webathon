import React from 'react'



function Blur() {

    const handleBlurClick = () => {
        const history = document.querySelector('.history');
        const blur = document.querySelector('.blur');
        blur.style.display = 'none';
        history.style.left = '-100%';
    }
  return (
    <div className='blur' onClick={handleBlurClick}>
    </div>
  )
}

export default Blur
