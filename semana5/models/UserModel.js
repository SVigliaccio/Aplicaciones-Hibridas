import mongoose from "mongoose";

const Schema = mongoose.Schema;
const mySchema = new Schema({
    name: String,
    email: String
});

const User = mongoose.model('users', mySchema);

export default User;

// import fs from "fs/promises";
// const path = './users.json';

// class UsersManager{
//     users = [];
//     constructor(users=[]){
//         this.users = users
//     }
//     randomID(){
//         return crypto.randomUUID();
//     }
//     async addUser(user){
//         await this.getUsers();
//         user.id = this.randomID();
//         this.users.push( user );
        
//         const data = JSON.stringify( this.users, null, 2);
//         try {
//             await fs.writeFile( path, data );
//             return user.id;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     async getUsers(){
//         try {
//             const data = await fs.readFile(path);
//             this.users = JSON.parse( data );
//             return this.users;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     async getUserById(id){
//         const users = await this.getUsers();
//         const user = users.find( u => u.id == id );
//         return user ? user : undefined;
//     }
//     async deleteUserById(id){
//         await this.getUsers();
//         const pos = this.users.findIndex( u => u.id == id);
//         this.users.splice(pos, 1);

//         const data = JSON.stringify( this.users, null, 2);
//         try {
//             await fs.writeFile( path, data );
//             return true ? pos != -1 : false;
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     async updateUserById (id, user){
//         await this.getUsers();
//         const pos = this.users.findIndex( u => u.id == id);
//         this.users[pos].name = user.name;
//         this.users[pos].email = user.email;
//         const data = JSON.stringify( this.users, null, 2);
//         try {
//             await fs.writeFile( path, data );
//             return user.id;
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }

// export default UsersManager;