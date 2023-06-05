const calcTotalMarks = subjects => {

    let totalAchievable = 0
    let totalObtained = 0

    for (let i = 0; i < subjects.length; i++) {
        totalAchievable += subjects[i].achievableScore
        totalObtained += subjects[i].obtainedScore
    }

    const total = {
        totalAchievable,
        totalObtained
    }

    return total
}

export default calcTotalMarks