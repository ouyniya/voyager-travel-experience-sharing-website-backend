const express = require("express")
const {aiChat,aiPage} = require("../controllers/ai-controller")
const aiRoute = express.Router();

aiRoute.post('/chat', aiChat);
aiRoute.get('/', aiPage);

module.exports = aiRoute
