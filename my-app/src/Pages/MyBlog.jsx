import { useEffect, useState } from "react";
import Widget from "../Components/Widget/Widget";
import { useSelector } from "react-redux";
import { fetchApi } from "../utils/fetchWrapper";
import { NavLink } from "react-router";
import Card from "../Components/Card/Card";
import './style.scss'

const MyBlogs = () => {
  const data1 = useSelector((state) => state.userData);
  const [data, setData] = useState([]);
  const [csrfToken, setCsrfToken] = useState(false);
  const [content, setContent] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {
    fetchApi({ url: "/blogs", }).then((res) => {
      const temp = res?.data?.filter((i) => {
        return i.user_id === data1.user_id;
      });
      setData(temp);
    });
  }, []);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        fetchApi({ url: "/api/csrf-token", isProtected: true }).then((res) => {
          setCsrfToken(res?.csrfToken);
        });
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const postHandler = () => {
    // if(!data1.permission.includes('update')) return;
    fetchApi({
      url: "/blogs",
      method: "POST",
      csrf: csrfToken,
      body: {
        blog_title: title,
        blog_content: content,
        user_id: data1.user_id,
      },
      isProtected: true,
    }).then((res) => {
      console.log(res, "_res");
    });
  };
  return (
    <>
      <Widget header="My Blogs">
        {data1.permission.includes('update') || data1?.is_admin ? 
        <form
          action={postHandler}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <label htmlFor="title">Title</label>
          <input
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter title"
          ></input>
          <textarea
            name="content"
            value={content}
            id="content"
            placeholder="Add your content"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit">Post</button>
        </form> : ""}
        <div className="container">
          {data?.length
            ? data.map((i) => {
                return (
                  <NavLink key={i.blog_id} to={`/blogs/${i.blog_id}`} state={i}>
                    <Card header={i.blog_title} posted_by={i.email} />
                  </NavLink>
                );
              })
            : ""}
        </div>
      </Widget>
    </>
  );
};

export default MyBlogs;
