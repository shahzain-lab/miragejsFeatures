import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';
import user from './Routes/user';
import * as diary from './Routes/diary';


///handleErrors response, if any problem while communicating with server
export const handleErrors = (error: any, message = "An error ocurred") => {
  return new Response(400, undefined, {
      data: {
          message,
          isError: true,
      },
  })
};

//our server
export const setUpServer = (env?: string): Server => {
    return new Server({
        environment: env ?? 'development',
        //creating models for dynamics data
        models: {
            entry: Model.extend({
                diary: belongsTo(),
            }),
            diary: Model.extend({
                entry: hasMany(),
                user:belongsTo()
            }),
            user: Model.extend({
                diary:hasMany()
            }),
        },

        ///Factories are the perfect place to encode the constraints of your seeding data
        factories: {
            user: Factory.extend({
                username: 'test',
                password: 'password',
                email: "Shahzain@gmail.com",
            }),
        },
           
        //seed are used for initial data that we have above 
        seeds: (server): any => {
            server.create('user');
        },

        ///routes for communicating with network requests
        routes():void {
            this.urlPrefix = 'https://diaries.app';

            this.get('/diaries/entries/:id', diary.getEntries);
            this.get('/diaries/:id', diary.getDiaries);

            this.post('/auth/login', user.login);
            this.post('/auth/signup', user.signup);

            this.post('/diaries/',diary.create);
            this.post('/diaries/entry/:id',diary.addEntry);

            this.put('/diaries/entry/:id', diary.updateEntry)
            this.put('/diaries/:id', diary.updateDiary);
        },
    });
};