import Feed from "@component/Feed";

const Home = () => {
  return (
    <div>
      <section className=" w-full flex-center text-center flex-col">
        <h1 className="head_text text-center ">
          Discover and Share
          <br />
          <span className="orange_gradient text-center ">
            AI-Powered Prompts
          </span>
          <p className="desc text-center ">
            PromptLab is open source AI prompting tool for modern world to
            discover,create and share creative prompts
          </p>
        </h1>
        {/* feed */}
        <Feed />
      </section>
    </div>
  );
};

export default Home;
