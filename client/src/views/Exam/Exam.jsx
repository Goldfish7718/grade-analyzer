import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import './Exam.sass'
import officeSupplies from  '../../assets/office supplies-6010.svg'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Exam = () => {

    const token = localStorage.getItem('token')

    const [subjectName, setSubjectName] = useState('');
    const [achievableScore, setAchievableScore] = useState(0);
    const [obtainedScore, setObtainedScore] = useState(0);

    const [title, setTitle] = useState('');
    const [subjectData, setSubjectData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        verify()
    }, [])

    useEffect(() => {
        requestSubjectData()
    }, [])

  return (
    <>
        <div className="exam">
            <Navbar suffix={`Dashboard > ${title}`} />
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
                </div>
                <hr />
            </React.Fragment>
            )}

            {!isLoading &&
            <div className="exam__subject-inputs">
                <input onChange={e => setSubjectName(e.target.value)} type="text" className="exam__subject-input grey-input" placeholder='Subject Name' />
                <input onChange={e => setAchievableScore(e.target.value)} type="number" className="exam__subject-input grey-input" placeholder='Achivable Score' />
                <input onChange={e => setObtainedScore(e.target.value)} type="number" className="exam__subject-input grey-input" placeholder='Obtained Score' />
                <button onClick={requestAddSubject} className="exam__subject-submit btn">Add Subject</button>
            </div>
            }

            {isLoading &&
                <div className="dashboard__error-message-container">
                    <h1 className="dashboard__error-message">Loading...</h1>
                </div>
            }            
        </div>
    </>
  )
}

export default Exam