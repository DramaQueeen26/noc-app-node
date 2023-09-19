import { envs } from './env.plugin'

describe('envs.plugin.ts', () => {

  test('should return env options', ()=> {

    expect( envs ).toEqual({
      PROD: false,
      URL: 'https://google.com/',
      MONGO_URL: 'mongodb+srv:',
      MONGO_DB_NAME: 'NOC-TEST',
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'test@gmail.com',
      MAILER_SECRET_KEY: 'asdad'
    })


  })

  test('should return error if not found env', async() => {
    
    jest.resetModules()
    process.env.PROD = 'truee'

    try {
      await import('./env.plugin')
      expect(true).toBe(false)


    } catch (error) {
      expect(`${error}`).toContain('"PROD" should be either "true", "false", "TRUE", "FALSE", 1, or 0')
    }

  })

})