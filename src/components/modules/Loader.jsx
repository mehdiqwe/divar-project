import { Oval } from "react-loader-spinner"

const Loader = () => {
    return (
        <Oval
            visible={true}
            height="80"
            width="80"
            color="#a62626"
            secondaryColor=" #a62626"
            ariaLabel="oval-loading"
            wrapperStyle={{display: "flex", justifyContent: "center", alignItems: "center", height: "450px"}}
        />
    )
}

export default Loader