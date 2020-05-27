import httpMocks from 'node-mocks-http';
import authorize from './authorize';

describe("admin check tests", () => {

    it("should call next function if role is admin", async () => {
        const user = { username: "someusername", userid: "someid", roles: ["admin"] };
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({
            locals: {
                user: user
            }
        })
        const next = jest.fn();

        await authorize("admin")(req, res, next);

        expect(next.mock.calls.length).toBe(1);

    })

    it("should return 500 if role is not admin", async () => {
        const user = { username: "someusername", userid: "someid", roles: ["somerole"] };
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({
            locals: {
                user: user
            }
        })
        const next = jest.fn();

        await authorize("admin")(req, res, next);

        expect(next.mock.calls.length).toBe(0);
        expect(res.statusCode).toBe(401)
    })

    it("should return 401 if role is empty", async () => {
        const user = { username: "someusername", userid: "someid", roles: [] };
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({
            locals: {
                user: user
            }
        })
        const next = jest.fn();

        await authorize("")(req, res, next);

        expect(next.mock.calls.length).toBe(0);
        expect(res.statusCode).toBe(401)
    })
    it("should return 500 for not having locale in res", async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse({})
        const next = jest.fn();

        await authorize("")(req, res, next);

        expect(next.mock.calls.length).toBe(0);
        expect(res.statusCode).toBe(500)
    })
})