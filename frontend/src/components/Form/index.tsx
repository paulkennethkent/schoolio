import { SubmitHandler, useForm } from "react-hook-form";
import { School } from "../../types";

export const Form = ({
  mutateFn,
  error = "",
  action = "Add",
  defaultValue = undefined,
}: {
  mutateFn: (data: School) => void;
  error?: string;
  action?: "Update" | "Add";
  defaultValue?: School;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<School>({ values: defaultValue });
  const onSubmit: SubmitHandler<School> = async (data) => {
    mutateFn(data);
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-5">
        <label className="form-control w-full max-w-xs">
          <div className="join">
            <input
              type="text"
              placeholder={
                action === "Update"
                  ? `Update ${defaultValue?.name}`
                  : "Add a school"
              }
              className="input input-bordered join-item input-sm"
              {...register("name", { required: true })}
            />
            <button className="btn join-item btn-sm" type="submit">
              {action}
            </button>
          </div>

          <div className="label">
            {errors.name && (
              <span className="label-text-alt text-red-500">
                This field is required
              </span>
            )}
            {error && (
              <span className="label-text-alt text-red-500">{error}</span>
            )}
          </div>
        </label>
      </form>
    </div>
  );
};
