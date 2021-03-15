module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '123456',
    database: 'bookswap',
    define: {
        timestamps: true,
        underscored: true,
    }
};

// timestamps: true cria campos created_at e updated_at em todas as tabelas
// underscored: true define o formato da base de dados para snake_case