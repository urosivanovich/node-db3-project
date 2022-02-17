const db = require('../../data/db-config')


/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try {
    const exist = await db('schemes')
    .where('scheme_id', req.params.scheme_id)
    .first()
    if(!exist){
      next({status:404, message:`scheme with scheme_id ${req.params.scheme_id} not found`})
    } else {
      next()
    }
    
  } catch(err) {
    next(err)
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body
  if (typeof scheme_name !== 'string' ||
      scheme_name === undefined ||
      !scheme_name.trim()
      ){
    next({status:400,message:'invalid scheme_name'})
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  const error = {status:400, message:'invalid step'}
  if( instructions === undefined ||
      typeof instructions !== 'string' ||
      !instructions.trim()
    ){
      next(error)
    } else if (
      typeof step_number !== 'number' ||
      step_number < 1
    ) {
      next(error)
    } else {
      next()
    }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
