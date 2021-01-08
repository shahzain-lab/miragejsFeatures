import { User } from "../../../interfaces/User.interface";
import { Diary } from "../../../interfaces/Diary.interface";
import { handleErrors } from "../Server";

export const create = (
    schema: any,
    req: Request
): { user:User; diary: Diary} | Response => {
    try{
        const {title, type, userId} = JSON.parse(req.requestBody) as Partial<Diary>;
        const exUser = schema.users.findBy({id: userId});
        if(!exUser) {
            return handleErrors(null, 'No such user exists.' );
        }
        const now = dayjs().format();
        const diary = exUser.createDiary({
            title,
            type,
            createdAt: now,
            updatedAt: now,
        });
        return {
            user:{
                ...exUser.attrs,
            },
            diary: diary.attrs,
        };
    }catch (error){
        return handleErrors(error, 'Failed to create Diary.');
    }
}

export const updateDiary = (schema: any, req: Request): Diary | Response