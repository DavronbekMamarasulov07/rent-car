import { Button } from "antd"
import "./NotFounf.css"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="not_found relative">
      <Button onClick={() => navigate("/")}  className="absolute top-5 hover:!border-slate-700 hover:!text-slate-700">Home</Button>
    </div>
  )
}

export default NotFound