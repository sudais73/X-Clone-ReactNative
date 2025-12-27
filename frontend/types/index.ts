export interface User{
    _id:string;
    username:string;
    firstName:string;
    lastName:string;
    profilePicture?:string;
    bio?:string;
    verified?:boolean;
}
export interface Comment{
    _id:string;
    content:string;
    createdAt:Date;
    user:User;
}
export interface Post{
    _id:string;
    content:string;
    image?:string;
    createdAt:Date;
    user:User;
    likes:string[];
    comments:Comment[];
}
export interface Notification{
    _id:string;
    from:{
        username:string;
        firstName:string;
        lastName:string;
        profilePicture?:string;
        verified?:boolean;
    };
    to:string
    type:'like' | 'comment' | 'follow';
    post?:{
        _id:string;
        content:string;
        imageUrl?:string;

    }
   comment?:{
    _id:string;
    content:string;
   }
    createdAt:Date;
    read:boolean;
    }