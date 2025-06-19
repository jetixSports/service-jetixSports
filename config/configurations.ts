export default () => ({
  port: parseInt(process.env.PORT??'3005') || '3005',
  database: {
   MONGODB_URI:process.env.MONGODB_URI,
   AUTH_DB:process.env.AUTH_DB
  },
});
