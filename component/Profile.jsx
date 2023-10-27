import PromptCard from "./PromptCard";

const  Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="text-5xl sm:text-6xl font-semibold mt-6 leading-[1.15] text-black text-left ">
        <span className="bg-gradient-to-t from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        {name} profile
        </span>
      </h1>
      <p className="text-left text-gray-700 mt-5 text-lg sm:text-xl max-w-2xl ">
        {desc}
      </p>
      {console.log("data : ", data)}

      <div className="mt-1  prompt_layout ">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
