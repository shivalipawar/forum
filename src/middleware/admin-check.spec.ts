import httpMocks from 'node-mocks-http';
import isAdmin from './admin-check';

describe("admin check tests",()=>{

    it("should call next function if role is admin",async()=>{
        const user = { username: "someusername", userid: "someid", roles: ["admin"] };
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({
            locals:{
                user:user
            }
        })
        const next = jest.fn();

        await isAdmin(req,res,next);

        expect(next.mock.calls.length).toBe(1);

    })

    it("should return 500 if role is not admin",async()=>{
        const user = { username: "someusername", userid: "someid", roles: ["somerole"] };
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({
            locals:{
                user:user
            }
        })
        const next = jest.fn();

        await isAdmin(req,res,next);

        expect(next.mock.calls.length).toBe(0);

    })

    it("should return 500 if role is empty",async()=>{
        const user = { username: "someusername", userid: "someid", roles: [] };
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({
            locals:{
                user:user
            }
        })
        const next = jest.fn();

        await isAdmin(req,res,next);

        expect(next.mock.calls.length).toBe(0);

    })
})