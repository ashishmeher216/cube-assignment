import { useEffect, useState } from "react";
import "./App.css";
import MyGrid from "./components/MyGrid";

type Address = {
  address: string;
  city: string;
  postalCode: string;
  state: string;
};
type Company = {
  title: string;
  name: string;
  department: string;
  address: Address;
};
type UserFromAPI = {
  id: number;
  firstName: string;
  email: string;
  address: Address;
  company: Company;
};
type User = {
  id: number;
  firstName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  title: string;
  detail: string;
};
const detailText: string =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = async () => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((json) => {
        const allUsers = json.users.map((user: UserFromAPI) => {
          return {
            id: user.id,
            firstName: user.firstName,
            email: user.email,
            address: user.address.address,
            city: user.address.city,
            postalCode: user.address.postalCode,
            state: user.address.state,
            title: user.company.title,
            detail: detailText,
          };
        });
        setUsers(allUsers);

        setSelectedUser(allUsers[0]);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div>
        <h2>Cube Assignment by Ashish Meher</h2>
      </div>
      <div className="App">
        <section className="left-side">
          <ul>
            {users.length > 0 ? (
              users.map((user: User) => {
                return (
                  <li
                    key={user.id}
                    className={selectedUser?.id === user.id ? "active" : ""}
                    onClick={() => handleClick(user)}
                  >
                    <h3>
                      {user.id} {user.firstName}
                    </h3>
                    <div className="title">
                      <span>{user.title} </span>
                      <span>{user.title} </span>
                      <span>{user.title} </span>
                      <span>{user.title} </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="loader"></div>
            )}
          </ul>
        </section>

        <section className="right-side">
          {selectedUser ? (
            <>
              <h3>{selectedUser.firstName}</h3>
              <div>
                {selectedUser.firstName} is a {selectedUser.title}. He lives in{" "}
                {selectedUser.address}, {selectedUser.city} - {" "}
                {selectedUser.postalCode}, {selectedUser.state}.
              </div>
              <p className="my-grid">{selectedUser.detail}</p>
            </>
          ) : (
            <div className="loader"></div>
          )}
          <div className="my-grid">
            <MyGrid />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
