"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("typeorm/repository/BaseEntity");
const class_validator_1 = require("class-validator");
const entity_1 = require("../questions/entity");
let Answer = class Answer extends BaseEntity_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column("text", { nullable: false }),
    __metadata("design:type", String)
], Answer.prototype, "answer", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column("text", { nullable: false }),
    __metadata("design:type", String)
], Answer.prototype, "vote", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column("text", { nullable: false }),
    __metadata("design:type", String)
], Answer.prototype, "userName", void 0);
__decorate([
    typeorm_1.ManyToOne(_ => entity_1.default, question => question.answers),
    __metadata("design:type", entity_1.default)
], Answer.prototype, "question", void 0);
Answer = __decorate([
    typeorm_1.Entity()
], Answer);
exports.default = Answer;
//# sourceMappingURL=entity.js.map