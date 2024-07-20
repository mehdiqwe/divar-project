import Loader from "components/modules/Loader"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCategory, deleteCategory } from "services/admin"

import styles from "./CategoryList.module.css"

const CategoryList = () => {
    const queryClient = useQueryClient()
    const [state, setState] = useState("")

    const { isLoading, data } = useQuery({
        queryKey: ["get-category"],
        queryFn: getCategory
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ["delete-category"],
        mutationFn: deleteCategory,
        isSuccess: queryClient.invalidateQueries({queryKey: ["get-category"]})
    })

    const deleteHandler = (id) => {
        mutate(id)
        setState(id)
    }

    return (
        <div className={styles.list}>
            {isLoading ? <Loader />
            : (data.data.map(i =>
                <div key={i._id}>
                    <img src={`/${i.icon}.svg`} />
                    <h5>{i.name}</h5>
                    <p>slug: {i.slug}</p>
                    <button onClick={() => deleteHandler(i._id)} disabled={state === i._id && isPending}>حذف</button>
                </div>))}
        </div>
    )
}

export default CategoryList