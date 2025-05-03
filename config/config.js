let config = {
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.DATABASE_URL || 'postgres://torquedash:torquedash@192.168.100.190:5432/torquedash',
        options: {
            logging: false
        }
    },
    session: {
        keys: process.env.SESSION_KEYS 
            ? process.env.SESSION_KEYS.split(',') 
            : ['6a5w4d65a4wd', 'a65w4d6aw4d89a4', '65f4b8b4szd8']
    }
};

module.exports = config;