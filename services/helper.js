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
    let total = 0
    let earned = 0
    courses.forEach(course=>{
        total += course.credits*10
        earned += course.creditsEarned*course.gradePoint
    })

    return (earned*10/total).toFixed(2)
}