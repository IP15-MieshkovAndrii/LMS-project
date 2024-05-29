const jwt =require('jsonwebtoken');
const {User} = require('../models/user.model');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/jwtToken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const registerUser = async(req, reply) => {
    try {
        const {name, email, password, role} = req.body;

        const userEmail = await User.findOne({ email });

        if(userEmail) {
            return reply.code(400).send({ errorMessage: "Email already exist!" })
        }

        const user = {
            name, 
            email,
            password,
            role
        }

        const activationToken = createActivationToken(user);


        const activationUrl = `${process.env.URL}/activate?token=${activationToken}`;

        try {
            await sendMail({
              email:user.email,
              subject:"Activate Your Account",
              message: `Hello ${user.name}, please click on the link to activate your account: <a href="${activationUrl}">Activate Account</a>.<br>Link will expire after 5 minutes!`
            })

            reply.status(201).send({
              success:true,
              message:`Please check your email:- ${user.email} to activate your account`
            })
            
          } catch (error) {
            return reply.code(500).send({ errorMessage: error.message })
            
        }


        
    } catch (error) {
        return reply.code(400).send({ errorMessage: error.message })
    }
  
}

const createActivationToken=(user) => {

    return token = jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });

}

const activateUser = async(req, reply) => {
    try {
        const { activationToken } = req.body;

        const newUser = jwt.verify(
            activationToken,
            process.env.ACTIVATION_SECRET
        );

        if (!newUser) {
            return reply.code(400).send({ errorMessage: "Invalid token!" })
        }

        const { name, email, password, role } = newUser;

        const userEmail = await User.findOne({email})
        let newPassword = await bcrypt.hash(password, 10);

        if(userEmail) {
            return reply.code(400).send({ errorMessage: "User already exist!" })
        }

        const user = await User.create({
            name,
            email,
            password: newPassword,
            role
        })
        return sendToken(user, 201, reply);
        
    } catch (error) {
        return reply.code(400).send({ errorMessage: error.message })
    }

}

const loginUser = async(req, reply) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return reply.code(400).send({ errorMessage: "Please provide the all fields!" })
        }

        const user = await User.findOne({email})

        if(!user) {
            return reply.code(400).send({ errorMessage: "User doesn't exist!" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        res.status(200).json({
            success: true,
            user,
        });

        if (!isPasswordValid) {
                return reply.code(400).send({ errorMessage: "Please provide the correct information!" })
        }
        
        return sendToken(user, 201, reply);
        
      } catch (error) {
        return reply.code(500).send({ errorMessage: error.message })
      }
}

const logoutUser = async(req, reply) => {
    try{
        reply.setCookie("token", null, {
            path: '/',
            domain: 'localhost',
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        }).code(201).send({
          success: true,
          message: "Log out successful!",
        });
      }catch(error){
        return reply.code(500).send({ errorMessage: error.message })
      }
}

const getUser = async(req, reply) => {
    try {
        const { accessToken } = request.query
        const object = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN
        );
        const id = object.id;

        const user = await User.findOne({id})

        if(!user) {
            return reply.code(400).send({ errorMessage: "User doesn't exist!" })
        }
      
        res.code(200).send({
            success: true,
            user,
        });

    } catch (error) {
        return reply.code(500).send({ errorMessage: error.message })
    }
}

const updateAccessToken = async (req, reply) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return reply.code(400).send({ errorMessage: "Refresh token is required!" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded) {
            return reply.code(400).send({ errorMessage: "Invalid refresh token!" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return reply.code(404).send({ errorMessage: "User not found!" });
        }

        return sendToken(user, 201, reply);
    } catch (error) {
        return reply.code(500).send({ errorMessage: error.message });
    }
};

const updateUserInfo = async (req, reply) => {
    try {
        const { name, email } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return reply.code(404).send({ errorMessage: "User not found!" });
        }

        if (email) {
            const isEmailExist = await User.findOne({ email });
            if (isEmailExist) {
                return reply.code(400).send({ errorMessage: "Email already exists!" });
            }
            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        await user.save();

        reply.code(200).send({
            success: true,
            user,
        });
    } catch (error) {
        return reply.code(500).send({ errorMessage: error.message });
    }
};

const updatePassword = async (req, reply) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return reply.code(404).send({ errorMessage: "User not found!" });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
            return reply.code(400).send({ errorMessage: "Invalid old password!" });
        }

        if (newPassword) {
            user.password = newPassword;
        }

        await user.save();

        reply.code(200).send({
            success: true,
            user,
        });
    } catch (error) {
        return reply.code(500).send({ errorMessage: error.message });
    }
};

const updateProfilePicture = async (req, reply) => {
    try {
        const { avatar } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return reply.code(404).send({ errorMessage: "User not found!" });
        }

        if (avatar) {
            user.avatar = avatar;
        }

        await user.save();

        reply.code(200).send({
            success: true,
            user,
        });
    } catch (error) {
        return reply.code(500).send({ errorMessage: error.message });
    }
};

const deleteUser = async (req, reply) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return reply.code(404).send({ errorMessage: "User not found!" });
        }

        await user.deleteOne({id})

        await user.save();

        reply.code(200).send({
            success: true,
            message: 'User deleted successfully!',
        });
    } catch (error) {
        return reply.code(500).send({ errorMessage: error.message });
    }
};

module.exports = {
    registerUser,
    activateUser,
    loginUser,
    logoutUser,
    getUser,
    updateUserInfo,
    updateAccessToken,
    updatePassword,
    updateProfilePicture,
    deleteUser
}