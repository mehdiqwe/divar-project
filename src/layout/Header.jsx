import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProfile } from "services/user"

import styles from "./Header.module.css"
import { getCookie } from "utils/cookie"

const Header = () => {
  const [show, setShow] = useState(false)
  
  const useClickOutside = (handler) => {
    let domNode = useRef()
    useEffect(() => {
      const maybeHandler = (e) => {
        if(!domNode.current?.contains(e.target)) {
          handler()
        }
      }
      document.addEventListener("mousedown", maybeHandler)
      return () => {
        document.removeEventListener("mousedown", maybeHandler)
      }
    }, [])
    return domNode
  }

  const domNode = useClickOutside(() => setShow(false))

  const navigate = useNavigate()
  const { data, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  const logoutHandler = () => {
    const accessToken = getCookie("accessToken")
    const refreshToken = getCookie("refreshToken")
    if (accessToken) document.cookie = `accessToken=${accessToken}; max-age=0`;
    if (refreshToken) document.cookie = `refreshToken=${refreshToken}; max-age=0`;
    refetch()
    navigate("/")
  }

  const dropdownHandler = () => {
    setShow(true)
  }

  return (
    <header className={styles.header}>
      <div>
        <Link to={"/"}>
          <img src="/divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="/location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div className={styles.personal}>
        <button onClick={dropdownHandler}>
          <span>
            <img src="/profile.svg" />
            <p>دیوار من</p>
          </span>
        </button>
        {show &&
            <div className={styles.dropdown} ref={domNode}>
              {!data && <Link to={"/auth"}>ورود</Link>}
              {data && <Link to={"/dashboard"}>داشبورد</Link>}
              {data && data.data.role === "ADMIN" && <Link to={"/admin"}>ادمین</Link>}
              {data && <Link onClick={logoutHandler}>خروج</Link>}
            </div>
          }
        <Link to={"/dashboard"} className={styles.button}>ثبت اگهی</Link>
      </div>
    </header>
  )
}

export default Header