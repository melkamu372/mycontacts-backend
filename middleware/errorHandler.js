const {constants}=require('../Controller/constants');
const errorHandler = (err, req, res, next) => {
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


class CustomError extends Error{
  constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
    this.status=statusCode>=400&& statusCode<500? 'fail': 'error';
    this.isOPerational=true;
    Error.captureStackTrace(this, this.constuctor);

  }
}
const gloabl=(error,req,res,next)=>{
  error.statusCode = error.statusCode|| 500;
  error.status = error.status || 'error';
  res.status(error.statusCode).json({
    status:error.statusCode,
    message:error.message
  });
}
module.exports = errorHandler;
