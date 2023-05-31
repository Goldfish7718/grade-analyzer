import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import './Exam.sass'
import officeSupplies from  '../../assets/office supplies-6010.svg'

const Exam = () => {

    const [data, setData] = useState(true)

  return (
    <>
        <div className="exam">
            <Navbar suffix="> Dashboard > In-Semester 2023" />
            <div className="exam__title">
                <h1 className="exam__title-text">In-Semester 2023</h1>
            </div>
            {!data &&
            <>
                <div className="exam__image">
                    <img src={officeSupplies} alt="" className="exam__image-img" />
                </div>
                <div className="exam__empty">
                    <h1 className="exam__empty-title">No Subjects added yet!</h1>
                </div>
            </>
            }

            {data &&
            <>
                <div className="dashboard__subject__data">
                    <h3 className="dashboard__subject__name">Programming in C++</h3>
                    <h3 className="dashboard__subject__percent">81.5%</h3>
                    <h3 className="dashboard__subject__total">81.5/100</h3>
                </div>
                <hr />
            </>
            }

            <div className="exam__subject-inputs">
                <input type="text" className="exam__subject-input grey-input" placeholder='Subject Name' />
                <input type="text" className="exam__subject-input grey-input" placeholder='Achivable Score' />
                <input type="text" className="exam__subject-input grey-input" placeholder='Obtained Score' />
                <button className="exam__subject-submit btn">Add Subject</button>
            </div>
        </div>
    </>
  )
}

export default Exam