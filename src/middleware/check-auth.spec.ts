import httpMocks from 'node-mocks-http';
import jwt from 'jsonwebtoken';
import checkAuth from './check-auth';
import config from '../config';

describe("check auth middleware test ",()=>{
    const mockRequest = (jwtToken:any,body:any) =>({
        headers :jwtToken,
        body
    })
    let reqwithExpiredToken = mockRequest({jwt : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNzcCIsInBhc3N3b3JkIjoiRGV2QDEyIiwiaWF0IjoxNTgzMTI0MDU2LCJleHAiOjE1ODMxMjc2NTZ9.HjPg6cb5CWSAqM1NvVn6Z4rHb6oJCkt5tVFMqcF5HN0"},{});
    const user = { username: "someusername", userid: "someid", roles: ["somerole"] };
    let token = jwt.sign(user,"SomeSecretKEyToTest",{expiresIn : 1000});
    let reqWithValidToken = mockRequest({jwt:token},{});

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("should validate and call next() for correct jwt",async(done)=>{
        let res = httpMocks.createResponse();
        let next = jest.fn();
        const prevSecret = config.jwtSecret;
        config.jwtSecret ="SomeSecretKEyToTest";
        
        await checkAuth(reqWithValidToken,res,next);

        expect(next.mock.calls.length).toBe(1);
        expect(res.statusCode).toBe(200);

        config.jwtSecret = prevSecret;
        done();
    })

    it("should validate and pdate local values for correct jwt",async(done)=>{
        let res = httpMocks.createResponse();
        let next = jest.fn();
        const prevSecret = config.jwtSecret;
        config.jwtSecret ="SomeSecretKEyToTest";
        
        await checkAuth(reqWithValidToken,res,next);

        expect(next.mock.calls.length).toBe(1);
        expect(res.locals.user).toStrictEqual(user);
        expect(res.statusCode).toBe(200);

        config.jwtSecret = prevSecret;
        done();
    })

    it("should throw error and return 401 for incorrect jwt",async(done)=>{
        let res = httpMocks.createResponse();
        let next = jest.fn();
        const prevSecret = config.jwtSecret;
        config.jwtSecret ="SomeSecretKEyToTest";
        
        await checkAuth(reqwithExpiredToken,res,next);

        expect(next.mock.calls.length).toBe(0);
        expect(res.statusCode).toBe(401);

        config.jwtSecret = prevSecret;
        done();
    })
})