const showcaseMiddleware = (req, res, next) => {
  console.log(`Request method: ${req.method} \nRequest URL: ${req.url}`);
  next();
};
export default showcaseMiddleware;
