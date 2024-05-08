import user from "../../../public//assets/chat.jpg";
import user2 from "../../../public//assets/chat2.jpg";
import user3 from "../../../public//assets/chat3.jpg";
import user4 from "../../../public//assets/chat4.jpg";
const AllMessageList = () => {
  const messageData = [
    {
      id: 0,
      image: user,
      name: "Rakibul Hasan",
      message: "Typing.....",
      time: "Just Now",
    },
    {
      id: 1,
      image: user2,
      name: "MD Arman",
      message: "That cool, go for it...😀",
      time: "Mon 12.30",
    },
    {
      id: 2,
      image: user3,
      name: "Raihan",
      message: "Great ! 🔥",
      time: "Sut 12.30",
    },
    {
      id: 3,
      image: user4,
      name: "Karim Ullah ",
      message: "Hello",
      time: "Fri 12.30",
    },
    {
      id: 4,
      image: user2,
      name: "Zahid Hasan",
      message: "How are you Luca? Would...😐",
      time: "Tue 12.30",
    },
    {
      id: 5,
      image: user3,
      name: "Rakibul Hasan",
      message: "What are you doing...🙁",
      time: "Thu 12.30",
    },
    {
      id: 4,
      image: user4,
      name: "Rakibul Hasan",
      message: "Could you please...",
      time: "Thu 12.30",
    },
    {
      id: 5,
      image: user,
      name: "Rakibul Hasan",
      message: "Typing.....",
      time: "Wed 12.30",
    },
    {
      id: 4,
      image: user2,
      name: "Rakibul Hasan",
      message: "Hi!",
      time: "Wed 12.30",
    },
    {
      id: 5,
      image: user3,
      name: "Rakibul Hasan",
      message: "I hope you are well.",
      time: "Wed 12.30",
    },
  ];

  return (
    <div>
      <div className="messageList">
        <div className="space-y-3">
       
          {messageData.map((data, i) => (
            <div
              key={data.id}
              className={`userMessageList ${
                i === 0 ? "bg-[#F7F7F7]" : ""
              }`}
            >
              <div className="flex items-center">
                <img
                  src={data.image}
                  className="h-10 w-10 rounded-full"
                  alt="user"
                />
                <div className="ml-2">
                  <h3>{data.name} </h3>
                  <small className="text-[#0DC143]">{data.message}</small>
                </div>
              </div>
              <span>{data.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMessageList;
