const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", { logging: false });

const generateSlug = (title) => {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
        allowNull: false
    }
});

//hook
Page.beforeValidate((page) => {
    if (!page.slug) {
        page.slug = generateSlug(page.title);
    }
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });
User.hasMany(Page, { foreignKey: 'authorId' });



module.exports = {
    Page, 
    User, 
    db
};
