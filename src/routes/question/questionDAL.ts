import { client } from "../../config/db";

export const postQuestion = async (req: any, res: any) => {
    try {
        const query = "INSERT INTO question(topic_id, question_name,user_id, username) VALUES($1,$2,$3,$4)";
        const values = [req.body.topicid, req.body.question, res.locals.user.userid, res.locals.user.username]

        let result = await client.query(query, values);
        if(result.rowCount > 0){
            res.status(200).json({"message":"Successfully added the question"});
        }else{
            console.log("Question addition failed");
            res.status(500).json({ "message": "Question addition failed" });
        }
    } catch (error) {
        console.log("Error inserting question " + JSON.stringify(error));
        res.status(500).send({ "message": "Question addition failed" });
    }
}