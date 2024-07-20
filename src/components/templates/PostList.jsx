import Loader from "components/modules/Loader"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPosts } from "services/user"
import { sp } from "utils/numbers"
import { deletePosts } from "services/user"

import styles from "./PostList.module.css"

const PostList = () => {
    const [state, setState] = useState("")
    const queryClient = useQueryClient()
    
    const { isLoading, data } = useQuery({
        queryKey: ["user-posts"],
        queryFn: getPosts
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ["delete-post"],
        mutationFn: deletePosts,
        isSuccess: queryClient.invalidateQueries({queryKey: ["user-posts"]})
    })

    const deleteHandler = (id) => {
        mutate(id)
        setState(id)
    }

    return (
        <div className={styles.list}>
            {isLoading ? <Loader /> : (
                <>
                    <h3>آگهی های شما</h3>
                    {data.data.posts.map(post =>
                        <div key={post._id} className={styles.post}>
                            <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
                            <div>
                                <p>{post.options?.title}</p>
                                <span>{post.options?.content}</span>
                            </div>
                            <div className={styles.price}>
                                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                                <span>{sp(post.amount)} تومان</span>
                                <button onClick={() => deleteHandler(post._id)} disabled={state === post._id && isPending}>حذف</button>
                            </div>
                        </div>
                    )}
                </>
            )} 
        </div>
    )
}

export default PostList