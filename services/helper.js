const gradePoints = {
    "AA":10,
    "AB":9,
    "BB":8,
    "BC":7,
    "CC":6,
    "CD":5,
    "DD":4,
    "FF":0
}

exports.calculateTotal = (courses)=>{
    let totalCredits = 0
    let earnedCredits = 0
    let totalCGPA = 0
    let earnedCGPA = 0
    courses.forEach(course=>{
        totalCredits += course.credits
        earnedCredits += course.creditsEarned
        totalCGPA += course.credits*10
        earnedCGPA += course.credits*course.gradePoint
    })
    
    return {totalCredits,earnedCredits,totalCGPA,earnedCGPA}
}

exports.getGrade = (marks,gradeRanges)=>{
    let _grade = "FF"
    for(const grade in gradeRanges){
        if(marks>=gradeRanges[grade][0] && marks<=gradeRanges[grade][1])
            _grade = grade
    }
    return _grade
}

exports.getGradePoint = (grade)=>{
    return gradePoints[grade]
}


exports.calculateSGPA = (courses)=>{
    const {totalCGPA, earnedCGPA} = exports.calculateTotal(courses)
    return (earnedCGPA*10/totalCGPA).toFixed(2)
}

