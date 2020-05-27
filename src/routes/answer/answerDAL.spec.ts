import httpMocks from 'node-mocks-http';
import { client } from '../../config/db';
import { postAnswer } from './answerDAL';

jest.mock("../../config/db",()=>{
    const mClient = {
        connect : jest.fn(),
        query : jest.fn(),
        end : jest.fn()
    }
    return {client : mClient}
})

describe("AnswerDAL tests", ()=>{

    let Client : any;
    beforeEach(()=>{
        Client = client;
    })

    afterEach(()=>{
        jest.clearAllMocks();
    })
    it("should return 200 for succesfully answer for a question", async(done)=>{
        
        let user = {
            userid:1,
            username:"abc"
        }

        let req = {
            body : {
                questionid : 278,
                answer : "Some answer"
            }
        }

        let res = httpMocks.createResponse({
            locals:{
                user:user
            }
        })

        Client.query.mockResolvedValueOnce({rows:[],rowCount:1});
        await postAnswer(req,res);

        expect(res.statusCode).toBe(200);
        done();
    })

    it("should return 500 for failure to answer for a question", async(done)=>{
        
        let user = {
            userid:1,
            username:"abc"
        }

        let req = {
            body : {
                questionid : 278,
                answer : "Some answer"
            }
        }

        let res = httpMocks.createResponse({
            locals:{
                user:user
            }
        })

        Client.query.mockResolvedValueOnce({rows:[],rowCount:0});
        await postAnswer(req,res);

        expect(res.statusCode).toBe(500);
        done();
    })

    it("should return 500 for incorrect data for postAnswer added", async(done)=>{

        let req = {
            body : {
                questionid : 278,
                answer : "Some answer"
            }
        }

        let res = httpMocks.createResponse()

        Client.query.mockRejectedValueOnce(new Error("Incorrect data for insertion"));
        await postAnswer(req,res);

        expect(res.statusCode).toBe(500);
        done();
    })
})