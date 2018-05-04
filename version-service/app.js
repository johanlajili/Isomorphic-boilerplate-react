const express = require('express');

const app = express();

app.get('/getAllGames', (req, res)=> {
	res.status(200).json({
		games: [
			'toto', 'tata'
		]
	});
});

app.listen(5000);