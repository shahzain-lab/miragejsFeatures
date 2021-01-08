import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';


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
        },
    });
};