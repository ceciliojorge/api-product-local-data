import { express } from ('express');
import { router } from express.Router();
import { _ } from ('lodash');
import { appStorage} from ('localStorage');

router.get('/',   (req, res) => {

    try {
        if(!req.query.sku)
        {
            res.status(400).send({'error' : 'Sku cannot be empty.'});
            return;
        }
        let _sku = req.query.sku;
        let product =  getOne(_sku);
        if(!product)
        {
            res.status(400).send({'sucess' : false, 'message': 'Cannot find product.', data:[{}]});
    
        }
        else{
            res.send(product);
        }
    }
    catch(err)
    {
        res.status(400).send({ 'sucess' : false, 'message' : 'Error to get product.', data: [{}]});
    }
 
 });
 

 let getOne = (_sku) => {

    let filteredProducts = JSON.parse(appStorage.getItem(_sku));
     if(filteredProducts)
     {
        let quantityTotal = 0;
 
         if(filteredProducts.inventory && filteredProducts.inventory.warehouses) // if not exists inventory or warehouses, quantityTotal is 0
         {
             quantityTotal = _.sumBy(filteredProducts.inventory.warehouses, 'quantity');

         }
         filteredProducts.inventory.quantity = quantityTotal;
         filteredProducts.isMarketable = quantityTotal > 0; //isMarketable if quantityTotal is greater then 0
     }
     return filteredProducts;
 
 };
 
 
 router.post('/', (req, res) => {
    try {

        var product = req.body;//
        var errors = [];
        if(!product)
        {
            res.status(400)({'sucess' : false, 'message': 'Product is empty', 'data' : [{}]});
        }
        else {
            req.checkBody('sku', 'Sku need to be Int').isInt();
            req.checkBody('name', 'Name is required').notEmpty();
            
            errors = req.validationErrors();
            if(errors && errors.length > 0){
                res.status(400).send({'sucess': false, 'message' : errors, 'data': [{}]});
                return;
            }
            else if (getOne(product.sku))
            {
                res.status(400).send({'sucess': false, 'message' : 'Product already exists.', 'data' : [{}]});
            }
            else{
                let _sku = parseInt(product.sku);
                appStorage.setItem(_sku, JSON.stringify(product));
                res.send({'sucess': true, 'message' : 'Product iserted!', 'data' : [product]});
            }            
        }
    }
    catch(err)
    {
        res.status(400).send({ 'sucess' : false,  'message' : 'Error to insert product.', 'data' : [{}]});
    }
 });
 
 router.put('/', (req, res) => {
     try {
        var product = req.body;//
        var errors = [];
        if(!product)
        {
            res.status(400).send({'sucess' : false,  'message' :  'Product is empty', 'data' : [{}]});
        }
        else {
            req.checkBody('sku', 'Sku need to be Int').isInt();
            req.checkBody('name', 'Name is required').notEmpty();
    
            errors = req.validationErrors();
    
            if(errors && errors.length > 0){
                res.status(400).send({'sucess' : false,  'message' :  errors, 'data' : [{}]});
                return;
            }
            else if (!getOne(product.sku))
            {
                res.status(400).send({'sucess' : false,  'message' : 'Product not exists', 'data' : [{}]});
                return;
            }
            else{
                let _sku = parseInt(product.sku);
                appStorage.setItem(_sku, JSON.stringify(product));
                res.send({'sucess' : true,  'message' : 'Product updated!', 'data' : [{}]});
            }        
        }
    }
    catch(err)
    {
        res.status(400).send({ 'sucess' : false,  'message' : 'Error to update product.', 'data' : [{}]});
    }
 });
 
 
 router.delete('/', (req, res) => {
 
    try {
        if(!req.query || !req.query.sku)
        {
            res.status(400).send({'sucess' : false,  'message' : 'Sku cannot be empty.', 'data' : [{}]});
        }
        else if (!getOne(req.query.sku))
        {
            res.status(400).send({'sucess' : false,  'message' : 'Product not exists.', 'data' : [{}]});
        }
        else
        {
            let _sku = req.query.sku;
            appStorage.removeItem(_sku);     
            res.send({'sucess' : true,  'message' : 'Product deleted.', 'data' : [{}]});
        }
    }
    catch(err)
    {
        res.status(400).send({ 'sucess' : false,  'message' : 'Error to delete product.', 'data' : [{}]});
    }
 
 });

module.exports = app => app.use('/product', router);