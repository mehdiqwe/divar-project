import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addCategory } from "services/admin"

import styles from "./CategoryForm.module.css"

const CategoryForm = () => {
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
  })

  const { mutate, isPending, data, isError } = useMutation({
    mutationKey: ["create-category"],
    mutationFn: addCategory,
    isSuccess: queryClient.invalidateQueries("get-category")
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (!form.name || !form.slug || !form.icon) return
    mutate(form)
  }

  return (
    <form onChange={changeHandler} onSubmit={submitHandler} className={styles.form}>
      <h3>دسته بندی جدید</h3>
      {isError && <p>مشکلی پیش امده است</p>}
      {data?.status === 201 && <p>دسته بندی با موفقیت اضافه شد</p>}
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isPending}>ایجاد</button>
    </form>
  )
}

export default CategoryForm