const notFound = (req, res, next) => {
    console.log(req.originalUrl)
    res.status(404).json({ message: "Page not found!"})
}

module.exports = notFound;