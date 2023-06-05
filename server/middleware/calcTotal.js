import calcPerecent from "./calcPercent.js"

const calcTotal = subjects => {

    if (subjects.length === 0)
        return 'N/A'

    let totalMarks = 0
    let totalObtainedMarks = 0

    for (let i = 0; i < subjects.length; i++) {
        totalMarks += subjects[i].achievableScore
        totalObtainedMarks += subjects[i].obtainedScore 
    }

    const totalPercentage = calcPerecent(totalMarks, totalObtainedMarks)
    return totalPercentage
}

export default calcTotal;