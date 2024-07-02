import mongoose from "mongoose";
import Joi from "joi";
import pkg from "joi-password-complexity";

const {password} =pkg


const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullname: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
				default: [],
			},
		],
		profileImg: {
			type: String,
			default: "",
		},
		coverImg: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},

		link: {
			type: String,
			default: "",
		},
		likedPosts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

const validateuser=(User)=>{
const validateschema = 	Joi.object({
   fullname:Joi.string().min(1).required(),
   username:Joi.string().min(6).max(16).required(),
   email:Joi.string().email().min(5).max(1000).required(),
   password: Joi.string().min(5).max(50).required(),
})
return validateschema.validate(User)
}

export {User,validateuser}