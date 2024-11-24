const contactUsSchema = require('../../models/ContactUs.model')

const insertReview = async (req,res)=>{
    try {
        const {fName,email,msg} = req.body;
        if(!fName || !email || !msg){
            return res.status(400).json({
                success:false,
                msg:"every fields is mandatory"
            })
        }

        const savedReview = await contactUsSchema.create({fName,email,msg});

        return res.status(200).json({
            success:true,
            msg:"review saved !!",
            review:savedReview
        })

    } catch (error) {
        
    }
}

module.exports = {insertReview}