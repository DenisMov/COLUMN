import { useEffect, useState } from "react";

import Card from "../card/Card";

import "./app.scss";

function App() {
  const [newColumn, setNewColumn] = useState([]);
  const [inProggresColumn, setInProggresColumn] = useState([]);
  const [doneColumn, setDoneColumn] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3001/items`)
      .then((res) => res.json())
      .then((data) => {
        const newItem = [];
        const progressItem = [];
        const doneItem = [];
        data.forEach((item) => {
          if (item.status === "new") {
            newItem.push(item);
          }
          if (item.status === "inProgress") {
            progressItem.push(item);
          }
          if (item.status === "done") {
            doneItem.push(item);
          }
        });
        setNewColumn(newItem);
        setInProggresColumn(progressItem);
        setDoneColumn(doneItem);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const changeStatus = (item, newStatus) => {
    const updatedItem = { ...item, status: newStatus };
    fetch(`http://localhost:3001/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewColumn((prev) => prev.filter((i) => i.id !== item.id));
        setInProggresColumn((prev) => prev.filter((i) => i.id !== item.id));
        setDoneColumn((prev) => prev.filter((i) => i.id !== item.id));

        // Пробую оновити статус
        if (newStatus === "new") {
          setNewColumn((prev) => [...prev, data]);
        }
        if (newStatus === "inProgress") {
          setInProggresColumn((prev) => [...prev, data]);
        }
        if (newStatus === "done") {
          setDoneColumn((prev) => [...prev, data]);
        }
      })
      .catch((error) => console.log(error));
  };

  const renderCard = (array) => {
    const cards = array.map((item, id) => {
      return (
        <Card
          key={id}
          item={item}
          title={item.title}
          descr={item.descr}
          changeStatus={changeStatus}
          changeColor={changeColor}
        />
      );
    });
    return cards;
  };

  const changeColor = (status) => {
    switch (status) {
      case "inProgress":
        return "orange";
      case "done":
        return "green";
      default:
        return "black";
    }
  };

  if (isLoading) return <h1 style={{ textAlign: "center" }}>Loading...</h1>;

  return (
    <div className="app">
      <div className="columnStyle">
        <div className="column">{renderCard(newColumn)}</div>
      </div>
      <div className="columnStyle">
        <div className="column">{renderCard(inProggresColumn)}</div>
      </div>
      <div className="columnStyle">
        <div className="column">{renderCard(doneColumn)}</div>
      </div>
    </div>
  );
}

export default App;
