import User from "../model/userModel.js"

export const create = async(req, res)=>{
    try{
        const userData = new User(req.body)
        const email = userData.email;
        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message:"User exists"})
        }
        const savedUser = await userData.save()
        res.status(200).json(savedUser)
    }
    catch(error){
        res.status(500).json({
            error: "Internal err"
        })
    }
}

export const fetch = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found" 
            });
        }

        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({
            error: "Internal error"
        });
    }
}
export const fetchOne = async (req, res) => {
    try {
        const id = req.params.id
        const users = await User.findOne({_id:id});

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found" 
            });
        }

        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({
            error: "Internal error"
        });
    }
}

export const updateUser = async (req,res) =>{
    try {
        const id = req.params.id
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            res.status(404).json({
                error:"Not Found"
            })
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body,{new:true})
        res.status(201).json(updateUser)
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found" 
            });
        }



    } catch (error) {
        res.status(500).json({
            error: "Internal error"
        });
    }
}

export const deleteUser = async (req, res) =>{
try{

    const id = req.params.id // basically param means the http param like localhost/id  here we can retrieve the id by using params.id
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            res.status(404).json({
                error:"Not Found"
            })
        }
        await User.findByIdAndDelete(id)
        res.status(201).json({message : "User deleted successfully"})
        

}catch (error) {
    res.status(500).json({
        error: "Internal error"
    });
}
}