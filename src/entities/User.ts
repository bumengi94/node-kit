import { Base } from "~@entities/Base";
import { Column, Entity, Index } from "typeorm";

@Entity("users")
export class User extends Base {
	@Column({ type: "varchar", unique: true })
	@Index()
	email: string;

	@Column({ type: "varchar", select: false })
	hash: string;
}
