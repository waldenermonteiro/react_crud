const convertDateToBr = (date) => {
    if (date === null) return ''
    let pattern = /(\d{4})-(\d{2})-(\d{2})/g
    let getDate = (pattern.exec(date))[0]
    return getDate.replace(pattern, '$3/$2/$1')
}
export {
    convertDateToBr
}