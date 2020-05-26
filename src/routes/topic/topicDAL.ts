import { client } from "../../config/db";

export const getTopics = async (req: any, res: any) => {
    console.log("Topic name " + JSON.stringify(req.query.name));
    try {
        let query;
        let values: any;
        if (req.query && req.query.name !== 'null') {
            query = "SELECT topic_name,username FROM topic WHERE topic_name = $1";
            values = [req.query.name];
        } else {
            query = "SELECT topic_name,username FROM topic";
            values = undefined;
        }
        const result = await client.query(query, values);
        res.status(200).json({ "topics": result.rows });
    } catch (error) {
        console.log("Error retrieving topics " + JSON.stringify(error));
        res.status(500).send({ "message": "No topics found" });
    }

    // TODO pagination to be added
    // const currentPage = req.params.currentPage === null ? 0 : req.params.currentPage; 
}
export const postTopic = async (req: any, res: any) => {
    try {
        const query = "INSERT INTO topic(topic_name, user_id, username) VALUES($1,$2,$3)";
        const values = [req.body.name, res.locals.user.userid, res.locals.user.username];
        const result = await client.query(query, values);
        if (result.rowCount > 0) {
            console.log("Topic added successfully " + JSON.stringify(result));
            res.status(200).json({ "message": "Topic successfully added" });
        } else {
            console.log("Topic addition failed");
            res.status(500).json({ "message": "Topic addition failed" });
        }
    } catch (error) {
        console.log("Error inserting topics " + JSON.stringify(error));
        res.status(500).send({ "message": "Topic addition failed" });
    }

}