import mongoose from "mongoose";
import Joi, { valid } from "joi";
import { JoiPasswordComplexity } from "joi-password-complexity";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
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
const validateschema = joi.Object({
   fullName:joi.String.min(1).required(),
   username:joi.String.min(6).max(16).required(),
   email:joi.email.min(5).max(10).required(),
})
return validateschema.validate(User)
}

export {User,validateuser}