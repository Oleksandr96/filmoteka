import {App} from "./app";
import {FilmsController} from "./films/films.controller";
import {FilmsService} from "./films/films.service";

async function bootstrap() {
    const filmsService = new FilmsService()
    await filmsService.init()

    const app = new App(new FilmsController(filmsService));
    await app.init()
}

bootstrap();