import React from 'react'
import Navbar from '../../components/Navbar'
import './AddExam.sass'

const AddExam = () => {
  return (
    <>
      <div className="addexam">
        <Navbar suffix="> Dashboard > Add Exam" />
        <div className="addexam__title">
            <h1 className="addexam__title-text">Add Exam</h1>
        </div>
        <div className="addexam__input-panel">
            <input type="text" placeholder='Exam Name' className='addexam__input grey-input' />
            <button className="addexam__button btn">Add Exam</button>
        </div>
      </div>
    </>
  )
}

export default AddExam