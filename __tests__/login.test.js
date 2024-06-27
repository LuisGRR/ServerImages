// eslint-disable-next-line node/no-unpublished-require
const supertest = require("supertest");
const userModel = require("../src/models/user.model");
const userService = require("../src/services/userService");
const { app, server } = require("../src/index");
const { default: mongoose } = require("mongoose");
const api = supertest(app)


describe('API /register', () => {
    beforeEach(async () => {
        await userModel.deleteMany({})
    });
    test("Register user", async () => {
        const response = await api.post("/register").send({ name: 'gerardo3', password: 'gerardo3', email: 'test3@test.com' }).expect('Content-Type', /application\/json/);
        expect(response.status).toBe(201);
        expect(response.body.ok).toBe(true);
    });

    /*test("Register error, whit non password",async () =>{
        const response = await api.post("/register").send({ name: '', password: 'gerardo3',email:'test3@test.com' });
        console.log(response.body)
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
    }); 
    */
});

describe('API /register NUM_USERS_SYS', () => {
    beforeEach(async function () {
        const initUser = [
            { name: 'gerardo', password: 'gerardo1', email: 'test@test.com' },
            { name: 'gerardo2', password: 'gerardo2', email: 'test2@test.com' },
            { name: 'gerardo3', password: 'gerardo3', email: 'test3@test.com' },
        ];

        await userModel.deleteMany({})

        const userObjects = initUser.map(user => new userModel(user));
        const promises = userObjects.map(user => user.save());
        await Promise.all(promises)
    });
    test("Register limit NUM_USERS_SYS", async () => {
        const response = await api.post("/register").send({ name: 'gerardo4', password: 'gerardo4', email: 'test4@test.com' });
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.err.message).toEqual("Existen mas ususarios de los configurados");
    });

});


describe('API /login"', () => {
    beforeEach(async () => {
        await userModel.deleteMany({})
        await userService.saveUser('ExistentUser', 'ExistentPassword', 'test@test.com');
    });

    test("Login succesful", async () => {
        const response = await api.post("/login").send({ name: 'ExistentUser', password: 'ExistentPassword' }).expect('Content-Type', /application\/json/);
        expect(response.status).toBe(200);
        expect(response.body.ok).toBe(true);
    });

    test("Login incorrect credentials", async () => {
        const response = await api.post("/login").send({ name: 'nonExistentUser', password: 'nonExistentPassword' });
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        // expect(response.body.err.message).toEqual("Contraseña incorrecta");
    });

    test("Login with password incorrect", async () => {
        const response = await api.post("/login").send({ name: 'ExistentUser', password: 'nonExistentPassword' });
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.err.message).toEqual("Contraseña incorrecta");
    });

    test("Login with non-existent user", async () => {
        const response = await api.post("/login").send({ name: 'nonExistentUser', password: 'ExistentPassword' });
        expect(response.status).toBe(400);
        expect(response.body.ok).toBe(false);
        expect(response.body.err.message).toEqual("El Usuario no existe");
    });
});

describe('API /logout', () => {
    beforeEach(async function () {
        await userModel.deleteMany({})
        await userService.saveUser('ExistentUser', 'ExistentPassword', 'test@test.com');
        await api.post("/login").send({ name: 'ExistentUser', password: 'ExistentPassword' });
    });
    test("Logout", async () => {
        const response = await api.get("/logout");
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/');
    });

    test('Logout without session', async () => {
        // Simula que no hay sesión
        const response = await api.get('/logout');
        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/');
    });
});


afterAll(async () => {
    await userModel.deleteMany({})
    await mongoose.connection.close()
    server.close();
});