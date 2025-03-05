import Widget from "../Components/Widget/Widget";
import Card from "../Components/Card/Card";
import "./style.scss";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchWrapper";

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchApi({
      url: '/blogs'
    }).then(res => {
      setLoading(false);
      setBlogList(res.data ?? []);
    })
  },[])
  return (
    <Widget header="Blogs">
      {loading ? <p>Loading....</p> : 
      <div className="container">
        {blogList?.length
          ? blogList.map((i) => {
              return (
                <NavLink key={i.blog_id} to={`/blogs/${i.blog_id}`} state={i}>
                  <Card header={i.blog_title} posted_by={i.email} />
                </NavLink>
              );
            })
          : ""}
      </div>}
    </Widget>
  );
};

export default Home;
