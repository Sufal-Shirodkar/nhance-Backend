const User = require('../models/usermodel')

const userRegistrationValidation = {
    name: {
        trim: true,
        exists: {
            errorMessage: 'name field is required'
        },
        notEmpty: {
            errorMessage: 'name field must have some value'
        },
    },
    mobile: {
        trim: true,
        exists: {
            errorMessage: 'Mobile field is required'
        },
        notEmpty: {
            errorMessage: 'Mobile field must have contact number'
        },
        isNumeric: {
            errorMessage: 'Mobile field value must be a number'
        },
        custom: {
            options: async function (val) {
                const user = await User.findOne({ mobile: val })
                 if(!user){
                    return true
                } else if(val !=10){
                    throw new Error('mobile must be 10 digits')
                } {
                    throw new Error('ContactNo already exists')
                }
            }
        }
    },
    password: {
        exists: {
            errorMessage: 'password field is required'
        },
        notEmpty: {
            errorMessage: 'password field must have some value'
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: 'password field value must be between 8-128 characters'
        },
        isStrongPassword: {
            errorMessage: 'password must have atleast one uppercase, one number and one special character'
        }
    },
}


const loginValidationSchema = {
    mobile: {
        trim: true,
        exists: {
            errorMessage: 'mobile field is required'
        },
        notEmpty: {
            errorMessage: 'mobile field must have contact number'
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'mobile field value must have 10 digits only'
        },
        isNumeric: {
            errorMessage: 'mobile field value must be a number'
        },
        custom: {
            options: async function (val) {
                const user = await User.findOne({ mobile: val })
                if (user) {
                    return true
                } else {
                    throw new Error('invalid mobile number')
                }
            }
        }
    },
    password: {
        exists: {
            errorMessage: 'password field is required'
        },
        notEmpty: {
            errorMessage: 'password field must have some value'
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: 'password field value must be between 8-128 characters'
        },
        isStrongPassword: {
            errorMessage: 'password must have atleast one uppercase, one number and one special character'
        }
    }
}
module.exports={
    userRegistrationValidation,
    loginValidationSchema
}