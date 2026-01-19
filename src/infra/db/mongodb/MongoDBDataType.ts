type MongoDBBsonTypeName =
    "null" |
    "bool" |
    "int" | "long" | "double" | "decimal" |
    "string" |
    "binData" |
    "date" | "timestamp" |
    "regex" |
    "javascript" |
    "objectId" |
    "object" | "array";

class MongoDBDataType
{
    protected constructor () {}

    public static readonly Null = "null" satisfies MongoDBBsonTypeName;

    public static readonly Boolean = "bool" satisfies MongoDBBsonTypeName;

    public static readonly NumberInt32 = "int" satisfies MongoDBBsonTypeName;
    public static readonly NumberInt64 = "long" satisfies MongoDBBsonTypeName;
    public static readonly NumberFloat64 = "double" satisfies MongoDBBsonTypeName;
    public static readonly NumberFloat128 = "decimal" satisfies MongoDBBsonTypeName;

    public static readonly String = "string" satisfies MongoDBBsonTypeName;

    public static readonly Binary = "binData" satisfies MongoDBBsonTypeName;

    public static readonly DateTime = "date" satisfies MongoDBBsonTypeName;
    public static readonly Timestamp = "timestamp" satisfies MongoDBBsonTypeName;

    public static readonly Regex = "regex" satisfies MongoDBBsonTypeName;

    public static readonly JavaScript = "javascript" satisfies MongoDBBsonTypeName;

    public static readonly Id = "objectId" satisfies MongoDBBsonTypeName;

    public static readonly Object = "object" satisfies MongoDBBsonTypeName;
    public static readonly Array = "array" satisfies MongoDBBsonTypeName;
}

export default MongoDBDataType;

export type {
    MongoDBBsonTypeName,
};
