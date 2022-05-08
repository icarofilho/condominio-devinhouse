import { Router } from "express";
const router = Router();

router.get('/',(_,res)=>{
  res.json({msg:"hello world"})
})

export default router;