const express = require("express")
const {aiChat,aiPage} = require("../controllers/ai-controller");
const authenticate = require("../middlewares/authenticate");
const aiRoute = express.Router();

aiRoute.post('/chat',authenticate, aiChat);
aiRoute.get('/',authenticate, aiPage);

module.exports = aiRoute
