import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Base {
	@Index()
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column("boolean", { default: true })
	enable: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
