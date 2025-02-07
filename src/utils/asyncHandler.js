const asyncHandler = (requestHandler)=>{

return (req,res,next)=>{
    Promise.resolve(
        requestHandler(req,res,next)

    ).catch((error)=>{
        next(error)
    })

}}


export default asyncHandler;




// const asyncHandler = (fn)=>async (req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }
//     catch(error){
//         res.status(500 || error.code ).json({message: error.message,sucess : false})
//     }

// }
