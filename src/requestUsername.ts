'use server';
import db from "./db";

export default async function requestEmail() {
    try {
        const users = await db.collection('Users')
        const user = await users.findOne({_id: new db.ObjectId("642cebc47615c00cb35ba0f0")});
        return user!.email;
    } catch (error) {
        console.error('Failed to get users:', error);
        //throw new Error('Failed to get users.');
        return "Ivan"
    } finally {
        db.close();
    }
}
