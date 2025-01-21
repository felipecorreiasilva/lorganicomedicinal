'use client'
import React, { useState } from 'react'

const Stepper = () => {
    const steps = ['Nome', 'Informações', 'Contato'];
    const [currentStep, setCurrentStep] = useState(1)
  return (
    <div className='flex justify-between'>
        {
            steps?.map((step, i)=>(
                <div key={i} className={`step-item ${
                    currentStep === i + 1 && 'active'

                } ${i + 1 < currentStep && 'complete'}`}
                >
                    <div className='step'>{i + 1}</div>
                    <p className='text-gray-500'>{step}</p>
                </div>
            ))
        }
        
    </div>
    
  )
}

export default Stepper