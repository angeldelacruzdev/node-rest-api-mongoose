import {Router} from 'express';

const router = Router();

import * as productCtrl from '../controllers/products.controller';

import {authJWT} from '../middlewares';


router.get('/', productCtrl.getProducts);    

router.post('/', [authJWT.verifyToken, authJWT.isAdmin] ,productCtrl.createProduct);  

router.get('/:productId', productCtrl.getProductById);  

router.put('/:productId',  [authJWT.verifyToken, authJWT.isAdmin], productCtrl.updateProductById); 
   
router.delete('/:productId',  [authJWT.verifyToken, authJWT.isAdmin], productCtrl.deleteProductById);    


export default router;


