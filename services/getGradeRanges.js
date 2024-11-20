const getGradeRanges = (SA,Span,median)=>{
    //AA Grade
    const AA_range = [SA, 100]

    //AB Grade
    const AB_start = SA - Span + 1
    const AB_range = [AB_start, SA-1]

    //BB Grade
    const BB_start = SA - 2*Span + 1
    const BB_end = SA - Span
    const BB_range = [BB_start, BB_end]

    //BC Grade
    const BC_start = SA - 3*Span + 1
    const BC_end = SA - 2*Span
    const BC_range = [BC_start, BC_end]

    //CC Grade
    const CC_start = SA - 4*Span + 1
    const CC_end = SA - 3*Span
    const CC_range = [CC_start, CC_end]

    //CD Grade
    const CD_start = SA - 5*Span + 1
    const CD_end = SA - 4*Span
    const CD_range = [CD_start, CD_end]

    //DD Grade
    const DD_start = Math.ceil(median/2)
    const DD_end = SA - 5*Span
    const DD_range = [DD_start, DD_end]

    //FF Grade
    const FF_range = [0, DD_start-1]

    return {
        'AA': AA_range, 'AB': AB_range, 'BB': BB_range, 'BC': BC_range,
        'CC': CC_range, 'CD': CD_range, 'DD': DD_range, 'FF': FF_range
    }
}

module.exports = getGradeRanges