import { model, Schema } from "mongoose";

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

export const Task = model("Task", bookSchema);
