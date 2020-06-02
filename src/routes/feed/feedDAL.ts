import { client } from '../../config/db';

export const getAllFeeds = async (req: any, res: any) => {
    console.log("Topic id " + JSON.stringify(req.query.topicid));
    try {
        if (!req.query.topicid) {
            let query = `SELECT topic_id, topic_name, username FROM topic`;
            let result = await client.query(query);
            console.log("All Topics" + JSON.stringify(result.rows));
            let topics = result.rows;
            FetchDataForTopics(topics).then(result => {
                res.status(200).json({ "feed": { "topics": result } });
            })
        } else {
            let query = `SELECT topic_id, topic_name, username FROM topic WHERE topic.topic_id = $1`;
            let values = [req.query.topicid];
            let result = await client.query(query, values);
            console.log("Topic for give id is " + JSON.stringify(result.rows));
            FetchDataForTopics(result.rows).then(result => {
                res.status(200).json({ "feed": { "topics": result } });
            })
        }
    } catch (error) {
        console.log("Error fetching feeds " + JSON.stringify(error));
        res.status(500).send({ "message": "Fetching feeds failed" });
    }
}

function FetchDataForTopics(topics: any[]) {
    return new Promise((res, rej) => {
        const questionsPromises = topics.map((topic) => {
            let query = `SELECT question_id, question_name, username from question where question.topic_id = $1`;
            let values = [topic.topic_id];
            return client.query(query, values);
        });

        Promise.all(questionsPromises).then(results => {
            const allResultPromises = results.map(r => {
                return getAllAnswersForAllQuestions(r.rows)
            })

            Promise.all(allResultPromises).then(results => {
                const topicResults = topics.map((t, index) => {
                    return {
                        name: t.topic_name,
                        user: t.username,
                        questions: results[index]
                    }
                })
                res(topicResults)
            })
        })
    })

}

function getAllAnswersForAllQuestions(questions: any[]) {
    return new Promise((resolve, reject) => {
        const promises = questions.map((question) => {
            let query = `SELECT answer_id, answer, username from answer where answer.question_id = $1`;
            let values = [question.question_id];
            return client.query(query, values);
        });

        Promise.all(promises).then(results => {
            const allAnswers = results.map(r => r.rows)
            const res = questions.map((q, index) => {
                return {
                    name: q.question_name,
                    user: q.username,
                    answers: allAnswers[index]
                }
            })
            resolve(res)
        })
    })
}

