function timestampToDate(timestamp) {
    let unixTimestamp = timestamp * 1000;
    let date = new Date(unixTimestamp);
    let formattedDate = date.toLocaleString(); 
    return formattedDate;
}

module.exports = {
    timestampToDate
}