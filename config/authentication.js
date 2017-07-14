const config = {
    github: {
        client: {
            id: '2e960397dd3dc5f624e0',
            secret: '5af7bef9d6933615a8027277eb1c95667290cc00',
        },
        auth: {
            tokenHost: 'https://github.com',
            tokenPath: '/login/oauth/access_token',
            authorizePath: '/login/oauth/authorize',
        }
    },
    solarwinds: {
        client: {
            id: 'ZbIIAw4ecUHzxnHuGrDcTdSjGugf4C4nmsUcE28C',
            secret: 'gJI7BFPyKnApYmiHCBURTKfKCAxDOHv5GnL1APC9',
        },
        auth: {
            tokenHost: 'https://app.ri.logicnow.com',
            tokenPath: '/oauth/token',
            authorizePath: '/oauth/authorize',
        }
    }
}
module.exports = config;
