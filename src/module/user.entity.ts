import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 CreateDateColumn,
 UpdateDateColumn,
 OneToMany,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('users')
export class User {
 @PrimaryGeneratedColumn()
 id!: number;

 @Column({ type: 'varchar', unique: true, nullable: false })
 username!: string;

 @Column({ type: 'varchar', nullable: false })
 password!: string;

 @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 created_at!: Date;

 @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 updated_at!: Date;

 @OneToMany(() => Task, (task) => task.user)
 tasks!: Task[];
}
