const Joi = require('joi');
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shareId: {
            type: DataTypes.STRING,
            unique: true
        },
        forwardUrls: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }, {
        hooks: {
            beforeCreate: hashPassword,
        }
    }
    );
    // create association
    User.associate = function (models) {
        User.hasMany(models.Session, {
            as: 'Sessions',
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
    };

    // Static method for user data validation
    User.validate = function(user) {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Please provide a valid email.',
                'any.required': 'Email is required.'
            }),
            password: Joi.string().min(8).required().messages({
                'string.min': 'Password must be at least 8 characters long.',
                'any.required': 'Password is required.'
            }),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
                'any.only': 'Passwords do not match.',
                'any.required': 'Please confirm your password.'
            })
        });
    
        return schema.validate(user);
    };

    // Instance method for password comparison
    User.prototype.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password)
    }

    return User;
}
    
async function hashPassword (user) {
     // Hash password before saving to db
     const SALT_FACTOR = 8;
     const salt = await bcrypt.genSalt(SALT_FACTOR);
     let hash = await bcrypt.hash(user.password, salt);
     await user.setDataValue('password', hash);
}