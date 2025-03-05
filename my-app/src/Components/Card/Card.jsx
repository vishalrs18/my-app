
const Card = (props) => {
  const {
    header = "",
    isDescription = false,
    content = "",
    posted_by
  } = props;


  return (
    <div className="item">
      {header && (
        <footer>
          <h3>{header}</h3>
          {isDescription && (
            <p className="desc">
              {content}
            </p>
          )}
          {<p className="price">Posted By: {posted_by}</p>}
        </footer>
      )}
    </div>
  );
};

export default Card;
