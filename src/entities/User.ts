import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { Base } from "./Base";

@Entity("users")
export class User extends Base {
	@Column("varchar", { length: 100, nullable: true })
	name: string;

	@Column("varchar", { unique: true, nullable: true })
	email: string;

	@Index()
	@Column("varchar", { unique: true })
	phone: string;

	@Column("varchar", { select: false, nullable: true })
	hash: string;
}
