const Router = require('../framework/Router');
const filmController = require('../controller/film.controller');

const router = new Router();

router.post('/film', filmController.addFilm);
router.get('/films', filmController.getFilms);
router.get('/film', filmController.getFilm);
router.put('/film', filmController.updateFilm);
router.delete('/film', filmController.deleteFilm);

module.exports = router;