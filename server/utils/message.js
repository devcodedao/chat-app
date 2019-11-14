const generateLocation = (from, latitude,longitude) => {
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createAt: new Date().getTime()
    }
}
module.exports={
    generateLocation
}