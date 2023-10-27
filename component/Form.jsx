import Link from "next/link";

const Form = ({ type, post, setpost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex flex-col justify-start items-start">
      <h1 className="head_text text-left">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {type} Post
        </span>
      </h1>
      <p className="mt-5 text-gray-700 max-w-2xl text-left text-lg sm:text-xl font-inter ">
        {type} and Share aamazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        action=""
        onSubmit={handleSubmit}
        className="font-satoshi w-full max-w-2xl flex flex-col gap-4 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5 my-5 "
      >
        <label>
          <h2 className="font-satoshi font-semibold text-base  text-gray-700 ">
            Your AI prompt{" "}
          </h2>
          <textarea
            value={post.prompt}
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
            placeholder="Enter your prompt here ...."
            required
            className=" w-full rounded-lg p-2 mt-2 h-[200px] text-gray-600 outline-none text-sm "
          />
        </label>
        <label>
          <h2 className="font-satoshi font-semibold text-base  text-gray-700 ">
           Tag <span className="text-gray-500 text-sm">(#IT #development #learning)</span>
          </h2>
          <input
            value={post.tag}
            onChange={(e) => setpost({ ...post, tag: e.target.value })}
            placeholder="Enter your tag here ...."
            required
            className=" w-full rounded-lg p-2 mt-2  text-gray-600 outline-none text-sm "
          />
        </label>
          
        <div className="flex justify-end items-center gap-2 ">
          <Link 
          href="/" 
          className="text-gray-600 text-sm"> Cancel
          </Link>

          <button 
          type="submit"
          disabled = {submitting}
          className="bg-primary-orange text-white rounded-xl px-2 py-1 text-sm">
           {submitting ? `${type}...`:type}
          </button>
          
        </div>

      </form>
    </section>
  );
};

export default Form;
