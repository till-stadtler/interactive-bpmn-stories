export function StarRating(props) {
  var rating = [];

  for (var i = 1; i < 6; i++) {
    if (i >= props.valueMin && i <= props.valueMax) {
      rating.push(<span className="fa fa-star checked" key={i}></span>);
    } else {
      rating.push(<span className="fa fa-star" key={i}></span>);
    }
  }

  return (
    <div>
      {props.skill ? <span>{props.skill}: </span> : null}
      {rating}
    </div>
  );
}
