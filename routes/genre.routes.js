const Router = require('../framework/Router');
const genreController = require('../controller/genre.controller');

const router = new Router();

router.post('/genre', genreController.createGenre);
router.get('/genres', genreController.getGenres);
router.get('/genre', genreController.getGenre);
router.put('/genre', genreController.updateGenre);
router.delete('/genre', genreController.deleteGenre);

module.exports = router;