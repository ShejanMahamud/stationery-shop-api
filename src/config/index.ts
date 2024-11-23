import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  databaseString: process.env.MONGO_URI || '',
  clientUrl: process.env.CLIENT_URL || '',
  jwtSecret: process.env.ACCESS_TOKEN || '',
};
