import { BaseSchema, ObjectSchema, string } from "yup";

export const loginValidator: BaseSchema = new ObjectSchema({
	body: new ObjectSchema({ email: string().required().email(), password: string().trim().required().min(6) }),
});

export const registerValidator: BaseSchema = new ObjectSchema({
	body: new ObjectSchema({ email: string().required().email(), password: string().trim().required().min(6) }),
});