import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const Button = ({children, onClick}) => {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  )
}

export default function App(){
  const [showAddFriend,setshowAddFriend] = useState(false);
  const [friends,setFriends] = useState(initialFriends);

  function handleShowFriend() {
    setshowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends,friend]);
  }

  return (
  <div className="app">
    <div className="sidebar">
      <FriendsList friends={friends}/>
      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
      <Button onClick={handleShowFriend}>
        {showAddFriend ? "close" : "Add Friend"}
      </Button> 
    </div>

    <FormSplitBill />
  </div>
  );
}
const FriendsList = ({friends}) => {
  
  return (
  <ul>
    {friends.map((friend) => (
      <Friend friend={friend} key={friend.id} />
    ))}
  </ul>
  )
} 

const Friend = ({friend}) =>{
  return ( 
  <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>}
    {friend.balance > 0 && <p className="green">You owe {friend.name} {Math.abs(friend.balance)}$</p>}
    {friend.balance === 0 && <p>You and {friend.name} are even </p>}
    <Button>Select</Button>
    
  </li>
  )
}

const FormAddFriend = ({onAddFriend}) => {
  const [name,setName] = useState("");
  const [image,setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit (e) {
    e.preventDefault();

    if (!name || !image) return ;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance : 0
    };
    onAddFriend(newFriend)
    console.log(newFriend)

    setImage("https://i.pravatar.cc/48")
    setName("")
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👭 Friend name</label>
      <input type="text"
            value={name}
            onChange={(e) =>setName(e.target.value)}
      />

      <label>🌄 Image url</label>
      <input type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  )
}

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a Bill with X</h2>

      <label>💰Bill value</label>
      <input type="text"></input>

      <label> 🧍‍♂️Your expense</label>
      <input type="text"></input>

      <label>🚶‍♂️ X's expense</label>
      <input type="text" disabled></input>
      
      <label>🤑 Who is paying the bill?</label>
        <select>
          <option value="user">You</option>
          <option value="friend">X</option>
        </select>
      <Button> split bill</Button>

    </form>
  )
}


