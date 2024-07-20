import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getCategory } from "services/admin"
import { getCookie } from "utils/cookie"

import toast from "react-hot-toast"

import styles from "./AddPost.module.css"

const AddPost = () => {
    const [sending, isSending] = useState(false)
    const [form, setForm] = useState({
        title: "",
        content: "",
        city: "",
        category: "",
        amount: null,
        images: null,
    })

    const { data } = useQuery({
        queryKey: ["get-category"],
        queryFn: getCategory
    })

    const changeHandler = (e) => {
        const { name, value, files } = e.target
        name !== "images" ? setForm(prev => ({ ...prev, [name]: value })) : setForm(prev => ({ ...prev, [name]: files[0] }))
    }

    const addHandler = (e) => {
        e.preventDefault()
        isSending(true)
        const formData = new FormData()
        for (let i in form) {
            formData.append(i, form[i])
        }

        const token = getCookie("accessToken")
        axios.post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            toast.success(res.data.message)
            isSending(false)
        }).catch(error => {
            toast.error("مشکلی پیش امده است")
            isSending(false)
        })
    }

    return (
        <form onChange={changeHandler} className={styles.form}>
            <h3>افزودن اگهی</h3>
            <label htmlFor="title">عنوان</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="content">توضیحات</label>
            <textarea name="content" id="content" />
            <label htmlFor="amount">قیمت</label>
            <input type="text" name="amount" id="amount" />
            <label htmlFor="city">شهر</label>
            <input type="text" name="city" id="city" />
            <label htmlFor="category">دسته بندی</label>
            <select name="category" id="category">
                {data && data.data.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
            </select>
            <label htmlFor="images">عکس</label>
            <input type="file" name="images" id="images" />
            <button onClick={addHandler} disabled={sending}>ایجاد</button>
        </form>
    )
}

export default AddPost