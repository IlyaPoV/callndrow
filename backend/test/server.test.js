import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import server from '../server.js'; // Импортируем сервер (убедитесь, что используете .js)

const chai = chaiModule.use(chaiHttp);

const should = chai.should(); // Определяем should

describe('Server', () => {
  it('should return status 200 on / GET', (done) => {
    chai.request.execute(server) // Здесь работает chai.request
      .get('/') // Здесь также добавьте маршрут, если он есть
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
  });
});
