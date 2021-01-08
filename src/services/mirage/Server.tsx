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
        environment: env ?? 'development',\
        //creating models for dynamics data
        models: {
            entry: Model.extend({
                diary: belongsTo(),
            }),
        }
    })
};