import useSelectedSchool from "../../store";
import { useSchool } from "../../query";
import { Fragment } from "react";

export const Display = () => {
  const { selectedSchool } = useSelectedSchool();
  const { data, isLoading, isError, isSuccess } = useSchool({
    id: selectedSchool,
  });

  return (
    <div className="stat">
      {isSuccess && (
        <Fragment>
          <div className="stat-title">
            id: {data?.data?.school?.id ?? "Unknown"}
          </div>
          <div className="stat-value">
            name: {data?.data?.school?.name ?? "Unknown"}
          </div>{" "}
        </Fragment>
      )}
      {isLoading && <p>Loading</p>}
      {isError && <p>Error</p>}
    </div>
  );
};
