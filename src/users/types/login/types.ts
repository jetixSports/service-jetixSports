export type MetaDataType = {
  initSession: Date;
};

export type ResponseLogin = {
  token: string;
  metadata: MetaDataType;
};
