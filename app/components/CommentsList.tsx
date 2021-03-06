import { Form, useActionData, useTransition } from "remix";
import { CommentEntry } from "~/types";

type CommentListProps = { movieId: string; comments: CommentEntry[] };

const CommentsList = ({ movieId, comments }: CommentListProps) => {
  const transition = useTransition();
  const actionData = useActionData();

  const inputStyle = (fieldName: string) =>
    `border border-slate-400 rounded py-2 px-3 inline-block w-full ${
      actionData?.errors[fieldName] ? "border-red-500" : ""
    }`;

  return (
    <div>
      <h4 className="text-xl mb-2 text-teal-800">Community Comments</h4>
      <div className="flex flex-col space-y-4 my-3">
        {comments.map((comment) => (
          <div className="p-4 rounded border border-slate-400">
            <div className="text-gray-700 font-bold text-xl mb-2">
              {comment.name}
            </div>
            <p className="text-gray-700">{comment.message}</p>
          </div>
        ))}
        <div className="p-4 rounded border border-slate-400">
          <Form method="post" action={`/movies/${movieId}`}>
            <fieldset disabled={transition.state === "submitting"}>
              <label htmlFor="name" className="inline-block my-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={inputStyle("name")}
              />
              {actionData?.errors.name && (
                <p className="text-red-500">{actionData?.errors.name}</p>
              )}

              <label htmlFor="message" className="inline-block my-2">
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                className={inputStyle("message")}
              />
              {actionData?.errors.message && (
                <p className="text-red-500">{actionData?.errors.message}</p>
              )}

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 btn"
                type="submit"
              >
                {transition.state === "submitting"
                  ? "Adding..."
                  : "Add Comment"}
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
