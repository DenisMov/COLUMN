import "./card.scss";

const Card = ({ item, title, descr, changeStatus, changeColor }) => {
  const cardColor = changeColor(item.status);

  return (
    <div className={`card ${cardColor}`}>
      <h3 className="card__title">{title}</h3>
      <p className="card__descr">{descr}</p>
      <div className="card__statuses">
        <span onClick={() => changeStatus(item, "new")}>new</span>
        <span onClick={() => changeStatus(item, "inProgress")}>inProgress</span>
        <span onClick={() => changeStatus(item, "done")}>done</span>
      </div>
    </div>
  );
};

export default Card;
