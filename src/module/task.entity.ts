import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 CreateDateColumn,
 UpdateDateColumn,
 ManyToOne,
 JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum TaskStatus {
 OPEN = 'OPEN',
 IN_PROGRESS = 'IN_PROGRESS',
 DONE = 'DONE',
}

@Entity('tasks')
export class Task {
 @PrimaryGeneratedColumn()
 id!: number;

 @Column({ type: 'varchar', length: '255', nullable: true })
 title!: string;

 @Column({ type: 'text', nullable: true})
 description?: string;

 @Column({
   type: 'enum',
   enum: TaskStatus,
   default: TaskStatus.OPEN,
 })
 status!: TaskStatus;

 @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'user_id' })
 user!: User;

 @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 created_at!: Date;

 @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}
