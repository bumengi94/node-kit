import { Column, CreateDateColumn, DeleteDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/**
 * Base entity for all entities.
 */
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

	@DeleteDateColumn()
	deletedAt: Date;
}
