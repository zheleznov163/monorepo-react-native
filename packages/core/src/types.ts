export type GetNames<FromType, KeepType = any, Include = true> = {
  [K in keyof FromType]: FromType[K] extends KeepType
    ? Include extends true
      ? K
      : never
    : Include extends true
    ? never
    : K
}[keyof FromType];

export type GraphQLScalarType = {
  Boolean: boolean;
  ID: string;
  String: string;
  AWSDate: string;
  AWSTime: string;
  AWSDateTime: string;
  AWSEmail: string;
  AWSJSON: string;
  AWSURL: string;
  AWSPhone: string;
  AWSIPAddress: string;
  Int: number;
  Float: number;
  AWSTimestamp: number;
};
