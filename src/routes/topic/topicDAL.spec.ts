import httpMocks from 'node-mocks-http';
import { client } from '../../config/db';
import { getTopics, postTopic } from './topicDAL';

jest.mock("../../config/db",()=>{
    const mockClient = {
        connect : jest.fn(),
        query : jest.fn(),
        end: jest.fn()
    }
    return { client : mockClient}
})
describe("Topic DAL tests",()=>{

    let Client : any;
    const user = { username: "someusername", userid: "someid", roles: ["somerole"] };

    beforeEach(()=>{
        Client = client;
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })

    it("should return 200 for getTopic valid request",async()=>{
        let req = httpMocks.createRequest({
            query : {name:"History",}
        })
        let res = httpMocks.createResponse();
        const user = {
            topic_name :"History",
            username : "someone"
        };
        Client.query.mockResolvedValueOnce({rows:[user],rowCount:1});

        await getTopics(req,res);

        expect(res.statusCode).toBe(200);
    })

    it("should return 500 for getTopic invalid request",async()=>{
        let req = httpMocks.createRequest({
            query : {name:"History",}
        })
        let res = httpMocks.createResponse();
        Client.query.mockRejectedValueOnce(new Error("No topics found"));

        await getTopics(req,res);

        expect(res.statusCode).toBe(500);
    })

    it("should return 200 with all topic when query param for topic name is null in getTopic",async()=>{
        let req = httpMocks.createRequest({
            query : {name:"History",}
        })
        let res = httpMocks.createResponse();
        const list = [{
            topic_name :"History",
            username : "someone"
        },
        {
            topic_name :"Geography",
            username : "someone"
        }];
        Client.query.mockResolvedValueOnce({rows:[list],rowCount:2});

        await getTopics(req,res);

        expect(res.statusCode).toBe(200);
    })
    
    it("should return 200 for postTopic valid request",async()=>{
        let req = httpMocks.createRequest({
            body : {name:"History",}
        })
        let res = httpMocks.createResponse({
            locals : {
                user:user
            }
        });
        Client.query.mockResolvedValueOnce({rows:[],rowCount:1});

        await postTopic(req,res);

        expect(res.statusCode).toBe(200);
    })

    it("should return 500 for postTopic updation in db failed",async()=>{
        let req = httpMocks.createRequest({
            body : {name:"History",}
        })
        let res = httpMocks.createResponse({
            locals : {
                user:user
            }
        });
        Client.query.mockResolvedValueOnce({rows:[],rowCount:0});

        await postTopic(req,res);

        expect(res.statusCode).toBe(500);
    })

    it("should return 500 for postTopic updation in db failed",async()=>{
        let req = httpMocks.createRequest({
            body : {name:"History",}
        })
        let res = httpMocks.createResponse({
            locals : {
                user:user
            }
        });
        Client.query.mockRejectedValueOnce(new Error("Topic addition failed"));

        await postTopic(req,res);

        expect(res.statusCode).toBe(500);
    })

})