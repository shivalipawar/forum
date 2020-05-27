import { client } from "../../config/db";

export const postAnswer = async(req: any,res: any)=>{

    try {
        let query = "INSERT INTO answer(question_id,answer,user_id,username) VALUES($1,$2,$3,$4)";
        let values= [req.body.questionid,req.body.answer,res.locals.user.userid, res.locals.user.username];

        let result = await client.query(query,values);
        if(result.rowCount > 0 ){
            res.status(200).json({"message":"Successfully added the answer"});
        }else{
            console.log("Answer addition failed");
            res.status(500).json({ "message": "Answer addition failed" });
        }
    } catch (error) {
        console.log("Error inserting answer " + JSON.stringify(error));
        res.status(500).send({ "message": "Answer addition failed" });
    }
}