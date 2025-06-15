const Job=require('../models/jobmodel');



const checkjobexpiry=async(req,res,next)=>{
    try{
        const job= await Job.findById(req.params.id)
        if(!job){
            return res.status(404).send('job not found')
        }
const expiry_date=new Date(job.end_date)
const current_date= new Date();

    if(expiry_date<current_date){
       return  res.json({message:'job has  expired'})
    }
next();
}
catch(err){
    res.status(500).send('internal server error'+err)
}
}
module.exports=checkjobexpiry;