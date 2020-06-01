import { client } from "../../config/db";

export const getAllFeeds = async (req: any, res: any) => {
    console.log("Topic name " + JSON.stringify(req.query.topicid));
    try {
        let finalResponse: Array<responseFeed> = [];
        if (!req.query.topicid) {
            let query = `SELECT topic_id, topic_name, username FROM topic`;
            let result = await client.query(query);
            console.log("All Topics" + JSON.stringify(result));
            let topics = result.rows;
            topics.forEach(async (topic) => {
                let query = `SELECT question_id, question_name, username from question where question.topic_id = $1`;
                let values = [topic.topic_id];
                let result = await client.query(query, values);
                console.log("All question for given topic " + JSON.stringify(result));
                let questionList = result.rows;
                questionList.forEach(async (question) => {
                    let query = `SELECT answer_id, answer, username from answer where answer.question_id = $1`;
                    let values = [question.question_id];
                    let result = await client.query(query, values);
                    console.log("All answers for topic " + JSON.stringify(result));
                    let answerList = result.rows;
                    answerList.forEach((answer) => {
                        let topicWithQuesAns = {
                            topics: {
                                name: topic.topic_name,
                                user: topic.username,
                                questions: [
                                    {
                                        name: question.question_name,
                                        user: question.username,
                                        answer: [
                                            {
                                                name: answer.answer,
                                                user: answer.username,
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        finalResponse.push(topicWithQuesAns);
                    })
                    res.status(200).json({ "feeds": finalResponse });
                })
            })
        } else {
            let query = `SELECT topic_id, topic_name, username FROM topic WHERE topic.topic_id = $1`;
            let values = [req.query.topicid];
            let result = await client.query(query, values);
            console.log("Topic for give id is " + JSON.stringify(result));
            if (result.rowCount > 0) {
                let topics = result.rows;
                topics.forEach(async (topic) => {
                    let query = `SELECT question_id, question_name, username from question where question.topic_id = $1`;
                    let values = [topic.topic_id];

                    let result = await client.query(query, values);
                    console.log("All question for given topic " + JSON.stringify(result));
                    if (result.rowCount > 0) {
                        let questionList = result.rows;
                        questionList.forEach(async (question) => {
                            let query = `SELECT answer_id, answer, username from answer where answer.question_id = $1`;
                            let values = [question.question_id];

                            let result = await client.query(query, values);
                            console.log("All answers for topic " + JSON.stringify(result));
                            if (result.rowCount > 0) {
                                let answerList = result.rows;
                                answerList.forEach((answer) => {
                                    let topicWithQuesAns = {
                                        topics: {
                                            name: topic.topic_name,
                                            user: topic.username,
                                            questions: [
                                                {
                                                    name: question.question_name,
                                                    user: question.username,
                                                    answer: [
                                                        {
                                                            name: answer.answer,
                                                            user: answer.username,
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                    finalResponse.push(topicWithQuesAns);
                                })
                                res.status(200).json({ "feeds": finalResponse });
                            } else {
                                console.log("No answers for topic");
                                res.status(404).send({ "message": "No feeds available" });
                            }
                        })
                    } else {
                        console.log("No question for topic");
                        res.status(404).send({ "message": "No feeds available" });
                    }

                })
            } else {
                res.status(404).send({ "message": "No feeds available" });
            }
        }
    } catch (error) {
        console.log("Error fetching feeds " + JSON.stringify(error));
        res.status(500).send({ "message": "Fetching feeds failed" });
    }
}

type responseFeed = {
    topics: {
        name: string;
        user: string;
        questions: {
            name: string;
            user: string;
            answer: {
                name: string;
                user: string;
            }[];
        }[];
    }
}