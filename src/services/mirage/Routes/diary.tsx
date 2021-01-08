import { User } from "../../../interfaces/User.interface";
import { Diary } from "../../../interfaces/Diary.interface";
import { handleErrors } from "../Server";
import { Entry } from "../../../interfaces/Entry.interface";

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

export const updateDiary = (schema: any, req: Request): Diary | Response => {
    try{
        const diary = schema.diaries.find( req.params.id );
        const data = JSON.parse(req.requestBody) as Partial<Diary>;
        const now = dayjs().format();
        diary.update({
            ...data,
            updatedAt: now,
        });
        return diary.attrs as Diary;
    } catch (error){
        return handleErrors(error, 'Failed to update diary.');
    }
};

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
    try{
        const user = schema.users.find(req.params.id);
        return user.diary as Diary[];
    }catch (error){
        return handleErrors(error, 'could not get user diaries')
    }
}
////
export const addEntry = (
    schema: any,
    req: Request
): { diary:Diary; entry: Entry } | Response => {
    try{
        const diary = schema.diaries.find(req.params.id);
        const {title, content} = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        const entry = diary.createEntry({
            title,
            content,
            createdAt: now,
            updatedAt: now,
        });
        diary.update({
            ...diary.attrs,
            updatedAt: now
        });
        return {
            
        }
    }
}