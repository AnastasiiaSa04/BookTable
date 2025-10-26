const notFound = (req, res, next) => {
    res.status(404).json({
        message: `${req.url} not found`
    })
}
export default notFound;