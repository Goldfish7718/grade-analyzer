const calcPerecent = (achievableScore, obtainedScore) => {
    const percentage = (obtainedScore / achievableScore) * 100
    const percentageRounded = percentage.toFixed(2)

    return percentageRounded
}

export default calcPerecent