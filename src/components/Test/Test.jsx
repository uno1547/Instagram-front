import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Test = () => {
  // const param = useParams()
  // console.log(param);
  console.log('test컴포넌트 랜더링');
  useEffect(() => {
    console.log('첫마운트');
  }, [])
  return (
    <div>
      <Link to = "/dynamic/otherparam">링크변화</Link>
    </div>
  )
}

export default Test