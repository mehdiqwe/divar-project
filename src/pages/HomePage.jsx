import Main from "components/templates/Main"
import Sidebar from "components/templates/Sidebar"

import { useQuery } from "@tanstack/react-query"
import { getAllPosts } from "services/user"

const HomePage = () => {
  const { data } = useQuery({
    queryKey: ["post-list"],
    queryFn: getAllPosts
  })

  return (
    <div style={{display: "flex"}}>
      <Sidebar />
      <Main posts={data}/>
    </div>
  )
}

export default HomePage