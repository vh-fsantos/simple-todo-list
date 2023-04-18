import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', length: 64 })
  title: string;

  @Column({ name: 'description', nullable: true, length: 256 })
  description?: string;

  @Column({ name: 'due_date', nullable: true })
  dueDate?: string;

  @Column({ name: 'status', default: false })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
