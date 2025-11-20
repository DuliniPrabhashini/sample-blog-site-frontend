import api from "./api";

export const getAllPosts = async () => {
    const res = await api.get("/post")

    return res.data
}

export const createPost = async(formData: FormData) => {
    const res = await api.post("/post/createPost",formData,{
        headers:{
            "Content-Type" : "multipart/form-data",
        },
    });
    return res.data
}

