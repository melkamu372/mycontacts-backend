const {constants}=require('../Controller/constants');
const errorHandler = (err, re, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERR:
      res.json({title:"validation Failed", message: err.message,
    stackTrace:err.stck});
      break;
      case constants.FORBIDEN:
        res.json({title:"For Biden", message: err.message,stackTrace:err.stack});
        break;
        case constants.UNAUTHORIZED:
      res.json({title:"Un authorized", message: err.message,stackTrace:err.stack});
      break;
    case constants.NOT_FOUND:
      res.json({title:"Not Found", message: err.message,stackTrace:err.stack});
      break;
      case constants.SERVER_ERR:
      res.json({title:"Internal Server Error", message: err.message,stackTrace:err.stack});
      break;
      default:
       res.json({title:"Server Error", message: err.message,stackTrace:err.stack})
  }
};
module.exports = errorHandler;
