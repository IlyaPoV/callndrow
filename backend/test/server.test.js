import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import server from '../server.js'; // Импортируем сервер (убедитесь, что используете .js)

const chai = chaiModule.use(chaiHttp);

const should = chai.should(); // Определяем should

const ser = chai.request.execute(server)
describe('Server', () => {
  it('should return status 200 on / GET', (done) => {

    ser.get('/')
    .end((err, res) => {
      res.should.have.status(200);
      done();
    })

  });

  after(() => 
    process.exit(0)
  );

});
