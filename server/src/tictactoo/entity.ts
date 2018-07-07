// src/pages/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

enum colors {
  red = "red",
  blue = "blue",
  green = "green",
  yellow = "yellow",
  magenta = "magenta"
}

@Entity()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @Column("text", { nullable: true })
  name: string;

  //@IsEnum(colors)
  @Column("text", { nullable: true })
  color: string;

  @Column("json", { nullable: false })
  board: any;
}
