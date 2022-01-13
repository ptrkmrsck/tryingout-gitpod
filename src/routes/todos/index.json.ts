import type {RequestHandler} from "@sveltejs/kit";

// TODO: persest in database
const todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export const post: RequestHandler<unknown, FormData> = (request) => {
    todos.push({
        text: request.body.get('text'),
        created_at: new Date,
        done: false
    });
    
    return {
        status: 303,
        headers: {location: "/"}
    }
}