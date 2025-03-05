import { useLocation, useParams } from "react-router";
import Widget from "../Components/Widget/Widget";
import Card from "../Components/Card/Card";
import { useEffect, useState } from "react";
import { fetchApi } from "../utils/fetchWrapper";

const Item = () => {
  const { blog_id: item } = useParams();
  const data = useLocation();
  const [blogData, setBlogData] = useState(data?.state);
  useEffect(() => {
    if (data && blogData) return;
    fetchApi({ url: `/blogs` }).then((res) => {
      const d = res.data.filter((i) => i.blog_id === item)?.[0];
      setBlogData(d);
    });
  }, []);

  if (!blogData) {
    return <p className="empty">Blog not found</p>;
  }

  return (
    <Widget widgetClass="item-page">
      <Card
        id={blogData.blog_id}
        header={blogData.blog_title}
        content={blogData.blog_content}
        posted_by={blogData.email}
        isDescription
      />
    </Widget>
  );
};

export default Item;
