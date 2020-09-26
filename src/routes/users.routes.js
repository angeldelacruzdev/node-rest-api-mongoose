import {Router} from 'express'

const router = Router()

import * as ususerCtrl from '../controllers/user.controller'

import { authJWT, verifrySignup } from '../middlewares';




router.post('/',[ authJWT.verifyToken ,authJWT.isAdmin, verifrySignup.checkRolesExist, verifrySignup.checkEmailDuplicate ] ,ususerCtrl.createUser);

router.get('/',[ authJWT.verifyToken ,authJWT.isAdmin] ,ususerCtrl.getUsers);


export default router;

