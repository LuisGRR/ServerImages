// eslint-disable-next-line node/no-unpublished-require
const supertest = require("supertest");
const tagsModel = require("../src/models/tags.model");
const userModel = require("../src/models/user.model");
const tagsService = require("../src/services/tagService");
const {app,server} = require("../src/index");
const { default: mongoose } = require("mongoose");
const api = supertest(app)


describe("Api /tag POST", ()=>{
    let cookie;

    beforeEach(async () => {
        await tagsModel.deleteMany({});
        await userModel.deleteMany({});

        const registerResponse = await api.post("/register").send({ name: 'ExistentUser', password: 'ExistentPassword',email:'test789@test.com' });
        cookie = registerResponse.headers['set-cookie'];
    });

    test("Tags POST succesful", async () =>{
        const response = await api.post("/tag")
        .set('Cookie', cookie) // Establecer la cookie de sesión en la solicitud
        .send({tags:['tags1', 'tag2']})
            .expect('Content-Type', /application\/json/);
        expect(response.status).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(response.body.message).toBe("El recurso ha sido guardado exitosamente")
    });

    test("Tags POST error send string", async () =>{
        const response = await api.post("/tag")
        .set('Cookie', cookie) // Establecer la cookie de sesión en la solicitud
        .send({tags:"esto no es una tag"});
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false)
        expect(response.body.err.message).toBe("Tags should be an array")
    });

    test("Tags POST, not array", async () =>{
        const response = await api.post("/tag")
        .set('Cookie', cookie) // Establecer la cookie de sesión en la solicitud
        .send({});
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false)
        expect(response.body.err.message).toBe("Tags should be an array")
    });

    test("Tags POST array empty", async () =>{
        const response = await api.post("/tag")
        .set('Cookie', cookie) // Establecer la cookie de sesión en la solicitud
        .send({tags:[]});
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.err.message).toBe("The tag array is empty");
    });
});

describe("Api /tags GET", ()=>{
    let cookie;

    beforeEach(async () => {
        await tagsModel.deleteMany({});
        await userModel.deleteMany({});

        const registerResponse = await api.post("/register").send({ name: 'ExistentUser', password: 'ExistentPassword',email:'test789@test.com' });
        cookie = registerResponse.headers['set-cookie'];
    });

    test("Get tags with a 200 status code",async () =>{
        const response = await api.get("/tags").set('Cookie', cookie).expect(200).expect('Content-Type', /application\/json/);
        expect(response.body).toEqual([]);
    });

    test("Get tags errors",async () =>{
        await new tagsModel({ name: 'tag1' }).save();
        await new tagsModel({ name: 'tag2' }).save();

        const response = await api.get("/tags").set('Cookie', cookie).expect(200).expect('Content-Type', /application\/json/);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'tag1' }),
            expect.objectContaining({ name: 'tag2' })
        ]));
    });

    test("GET /tags - should return error if there is a problem fetching tags", async () => {
        // Simula un error en el servicio de Tags
        jest.spyOn(tagsService, 'tagFind').mockImplementation(() => {
            throw new Error("Simulated service error");
        });

        const response = await api.get("/tags").set('Cookie', cookie);
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.err).toHaveProperty('message', 'Error al obtner la informacion');

        // Restaura la implementación original
        tagsService.tagFind.mockRestore();
    });
});


afterAll(async ()=>{
    await tagsModel.deleteMany({});
    await userModel.deleteMany({});
    await mongoose.connection.close()
    server.close();
  });