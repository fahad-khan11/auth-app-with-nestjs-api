export type BlacklistTokenDocument = BlacklistToken & Document;
export declare class BlacklistToken {
    token: string;
    createdAt: Date;
}
export declare const BlacklistTokenSchema: import("mongoose").Schema<BlacklistToken, import("mongoose").Model<BlacklistToken, any, any, any, import("mongoose").Document<unknown, any, BlacklistToken> & BlacklistToken & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BlacklistToken, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BlacklistToken>> & import("mongoose").FlatRecord<BlacklistToken> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
