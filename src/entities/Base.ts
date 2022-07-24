import { Column, CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Base {
	@Index()
	@PrimaryGeneratedColumn()
	id: number;

	@Column("boolean", { default: true })
	enable: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
