declare namespace Express {
  interface Request {
    userData?: {
      _id: string;
      email: string;
      role: string;
    };
    userPermissions?: {
      [key: string]: {
        CREATE: boolean;
        READ: boolean;
        UPDATE: boolean;
        DELETE: boolean;
      };
    };
  }
}