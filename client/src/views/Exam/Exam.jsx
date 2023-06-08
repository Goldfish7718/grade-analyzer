import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './Exam.sass'
import officeSupplies from  '../../assets/office supplies-6010.svg'
import pencilToSquare from '../../assets/pencil-to-square.svg'
import trash from '../../assets/trash.svg'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Exam = () => {

    const token = localStorage.getItem('token')

    const [subjectName, setSubjectName] = useState('');
    const [achievableScore, setAchievableScore] = useState(0);
    const [obtainedScore, setObtainedScore] = useState(0);

    const [updatedSubjectName, setUpdatedSubjectName] = useState('');
    const [updatedAchievableScore, setUpdatedAchievableScore] = useState(0);
    const [updatedObtainedScore, setUpdatedObtainedScore] = useState(0);

    const [title, setTitle] = useState('');
    const [subjectData, setSubjectData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [openSubject, setOpenSubject] = useState('');

    const [newName, setNewName] = useState('');
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const { exam } = useParams()
    const navigate = useNavigate()

    const verify = () => {
        if (!token) navigate('/login')
    }

    const requestAddSubject = async e => {
        e.preventDefault()
        try {
            const floatAchievableScore = parseFloat(achievableScore)
            const floatObtainedScore = parseFloat(obtainedScore)

            await axios.post(`http://localhost:5000/exams/${exam}/addsubject`, {
                subjectName,
                achievableScore: floatAchievableScore,
                obtainedScore: floatObtainedScore
            })
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }
    
    const requestSubjectData = async () => {
        setIsLoading(true)
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            const res = await axios.get(`http://localhost:5000/exams/${exam}`)

            setSubjectData(res.data.subjects)
            setTitle(res.data.examName)
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false)
    }

    const setOpenSubjectState = subjectID => {
        if(!openSubject) {
            setOpenSubject(subjectID)
        } else {
            setOpenSubject('')
        }
    }

    const requestSubjectDelete = async (e, subjectID) => {
        e.preventDefault()
        try {
            await axios.delete(`http://localhost:5000/exams/deletesub/${exam}/${subjectID}`)
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    const requestSubjectUpdate = async (e, fieldToUpdate, updateValue, subjectID) => {
        e.preventDefault()
        try {
            const updatedFields = []
            const updatedValues = []

            for (let i = 0; i < fieldToUpdate.length; i++) {
                if (updateValue[i] == "" || updateValue[i] == 0) {
                    continue
                } else {
                    updatedFields.push(fieldToUpdate[i])
                    updatedValues.push(updateValue[i])
                }
            }
            
            console.log(updatedFields, updatedValues);

            await axios.patch(`http://localhost:5000/exams/updatesub/${exam}/${subjectID}`, {
                updatedFields,
                updatedValues
            })
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    const requestExamUpdate = async e => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:5000/exams/updateexam/${exam}`, {
                newName
            })
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    const requestExamDelete = async e => {
        e.preventDefault()
        try {
            await axios.delete(`http://localhost:5000/exams/deleteexam/${exam}`)
            navigate('/dashboard')
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        verify()
    }, [])

    useEffect(() => {
        requestSubjectData()
    }, [])

  return (
    <>
        <div className="exam">
            <Navbar suffix={`> Dashboard > ${title}`} />
            <div className="exam__title">
                <h1 className="exam__title-text">{title}</h1>
            </div>
            {!isLoading && subjectData.length == 0 &&
            <>
                <div className="exam__image">
                    <img src={officeSupplies} alt="" className="exam__image-img" />
                </div>
                <div className="exam__empty">
                    <h1 className="exam__empty-title">No Subjects added yet!</h1>
                </div>
            </>
            }

            {!isLoading && subjectData && subjectData.length > 0 && subjectData.map(subject => 
            <React.Fragment key={subject._id}>
                <div className="dashboard__subject__data">
                    <h3 className="dashboard__subject__name">{subject.subjectName}</h3>
                    <h3 className="dashboard__subject__percent">{subject.percentage}%</h3>
                    <h3 className="dashboard__subject__total">{`${subject.obtainedScore}/${subject.achievableScore}`}</h3>

                    <div className="dashboard__subject-options">
                        <button onClick={() => setOpenSubjectState(subject._id)} className="dashboard__subject-option btn"><img src={pencilToSquare} alt="" className="dashboard__subject-option-img" /></button>
                        <button onClick={e => requestSubjectDelete(e, subject._id)} className="dashboard__subject-option btn"><img src={trash} alt="" className="dashboard__subject-option-img" /></button>
                    </div>
                </div>

                {openSubject === subject._id &&
                <div className="exam__subject-inputs" key={subject._id}>
                    <input onChange={e => setUpdatedSubjectName(e.target.value)} type="text" className="exam__subject-input grey-input" placeholder='Subject Name' />
                    <input onChange={e => setUpdatedAchievableScore(e.target.value)} type="number" className="exam__subject-input grey-input" placeholder='Achivable Score' />
                    <input onChange={e => setUpdatedObtainedScore(e.target.value)} type="number" className="exam__subject-input grey-input" placeholder='Obtained Score' />
                    <button onClick={
                        e => {
                            requestSubjectUpdate(
                                e, 
                                [
                                    "subjectName",
                                    "achievableScore",
                                    "obtainedScore"
                                ],
                                [
                                    updatedSubjectName,
                                    updatedAchievableScore,
                                    updatedObtainedScore
                                ],
                                subject._id
                            )
                        }
                    } className="exam__subject-submit btn">Update</button>
                </div>
                }
                <hr />
            </React.Fragment>
            )}

            {!isLoading &&
            <div className="exam__subject-inputs">
                <input onChange={e => setSubjectName(e.target.value)} type="text" className="exam__subject-input grey-input" placeholder='Subject Name' />
                <input onChange={e => setAchievableScore(parseFloat(e.target.value))} type="number" className="exam__subject-input grey-input" placeholder='Achivable Score' />
                <input onChange={e => setObtainedScore(parseFloat(e.target.value))} type="number" className="exam__subject-input grey-input" placeholder='Obtained Score' />
                <button onClick={requestAddSubject} className="exam__subject-submit btn">Add Subject</button>
            </div>
            }

            {isLoading &&
                <div className="dashboard__error-message-container">
                    <h1 className="dashboard__error-message">Loading...</h1>
                </div>
            }

            {!isLoading &&
            <div className="exam__danger-zone-container">
                <div className="exam__danger-zone">
                    <div className="exam__name-edit-container">
                        <div className="exam__name-edit">
                            <input onChange={e => setNewName(e.target.value)} type="text" className="exam__name-edit-input grey-input" placeholder='Change Name' />
                        </div>

                        <button onClick={requestExamUpdate} className='exam__edit-button btn'><img src={pencilToSquare} alt="" className="exam__edit-img" /></button>
                    </div>

                    <div className="exam__delete">
                        <button onClick={() => setIsDeleteOpen(true)} className="exam__delete-button">Delete Exam</button>
                    </div>
                </div>

                {isDeleteOpen &&
                <div className="exam__delete-confirmation">
                    <h1 className="dashboard__error-message">Are you sure you want to delete {title}?</h1>

                    <div className="exam__delete-confirm-options">
                        <button onClick={requestExamDelete} className="exam__delete-yes btn">Yes</button>
                        <button onClick={() => setIsDeleteOpen(false)} className="exam__delete-yes btn">No</button>
                    </div>
                </div>
                }
            </div>            
            }
        </div>
    </>
  )
}

export default Exam