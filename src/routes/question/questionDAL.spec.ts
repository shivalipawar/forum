import httpMocks from 'node-mocks-http';
import { client } from '../../config/db';
import { postQuestion } from './questionDAL';

jest.mock("../../config/db",()=>{
    const mClient = {
        connect : jest.fn(),
        query : jest.fn(),
        end : jest.fn()
    }
    return {client : mClient}
})
describe("QuestionDAL tests",()=>{

    let Client : any;
    beforeEach(()=>{
        Client = client;
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })
    it("should return 200 for succesful question addition", async(done)=>{
        
        let user = {
            userid:1,
            username:"abc"
        }
        let req = {
            body : {
                topicid:1,
                question:"Where is pune located"
            }
        }
        
        let res = httpMocks.createResponse({
            locals : {
                user:user
            }
        })

        Client.query.mockResolvedValueOnce({rowCount:1, rows : []});
        await postQuestion(req,res);

        expect(res.statusCode).toBe(200);
        done();
    })

    it("should return 500 for question addition failure", async(done)=>{
        
        let user = {
            userid:1,
            username:"abc"
        }
        let req = {
            body : {
                topicid:1,
                question:"Where is pune located"
            }
        }
        
        let res = httpMocks.createResponse({
            locals : {
                user:user
            }
        })

        Client.query.mockRejectedValueOnce({rowCount:0, rows : []});
        await postQuestion(req,res);

        expect(res.statusCode).toBe(500);
        done();
    })

    it("should return 500 for incomplete data for question addition", async(done)=>{
        let req = {
            body : {
                topicid:1,
                question:"Where is pune located"
            }
        }
        
        let res = httpMocks.createResponse();

        Client.query.mockResolvedValueOnce({rowCount:1, rows : []});
        await postQuestion(req,res);

        expect(res.statusCode).toBe(500);
        done();
    })
})