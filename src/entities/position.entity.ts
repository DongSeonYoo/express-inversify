import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClubMember } from './club-member.entity';

@Entity('position_tb', { schema: 'public' })
export class Position {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column('character varying', { name: 'name', nullable: true, length: 10 })
    name: string | null;

    @OneToMany(() => ClubMember, (clubMemberTb) => clubMemberTb.position)
    clubMemberTbs: ClubMember[];
}
