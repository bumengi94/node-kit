import { Column, Entity, Index } from "typeorm";
import { Base } from "./Base";

@Entity("users")
export class User extends Base {
	@Index()
	@Column({ type: "varchar", unique: true })
	email: string;

	@Column({ type: "varchar", select: false })
	hash: string;
}
