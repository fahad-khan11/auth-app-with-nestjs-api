import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type BlacklistTokenDocument = BlacklistToken & Document;

@Schema()
export class BlacklistToken {

    @Prop({type: String, required:true ,unique:true})
    token:string;

    @Prop({type:Date,required:true ,default:Date.now()})
    createdAt:Date;

}

export const BlacklistTokenSchema = SchemaFactory.createForClass(BlacklistToken);



