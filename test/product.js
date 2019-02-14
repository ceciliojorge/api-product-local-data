import { chai } from ire('chai');
import { server } from ('../src/index');
import { chaiHttp } from ('chai-http');
import { should } from hai.should();

chai.use(chaiHttp);

describe('Product', function(){

    let sku = 123456
    let product = {
        "sku": 123456,
        "name": "Colchão Box Casal Suede Preto",
        "inventory": {
            "warehouses": [
                {
                    "locality": "São Bernardo do Campo",
                    "quantity": 3
                },
                {
                    "locality": "Matriz",
                    "quantity": 12
                }
            ]
        }
    };


    it('New Product', function(done){

        chai.request(server)
        .post('/product')
        .send(product)
        .end(function (err, res){
            res.should.have.status('200');
            done();
        })       

    });

    it('New Product - Sku already exists', function(done){

        chai.request(server)
        .post('/product')
        .send(product)
        .end(function (err, res){
            res.should.have.status('400');
            res.body.should.have.property('error');
            res.body.error.should.equal('Product already exists.');
            done();
        })       

    });


    it('Get Product', function(done){

        chai.request(server)
        .get('/product/?sku=' + sku)
        .end(function (err, res){
            res.should.have.status('200');
            res.body.should.have.property('sku');
            done();
        })

    });


    it('Update Product', function(done){

        chai.request(server)
        .put('/product')
        .send(product)
        .end(function (err, res){
            res.should.have.status('200');
            done();
        })

    });

    it('Delete Product', function(done){
        chai.request(server)
        .delete('/product/?sku=' + sku)
        .end(function (err, res){
            res.should.have.status('200');
            done();
        })
    });
});