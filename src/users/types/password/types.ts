export type MetaDataType = {
  initSession: Date;
};

export type ResponseRecoverPassword = {
  token: string;
  metadata: MetaDataType;
};
