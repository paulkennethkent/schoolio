import { Link } from "react-router-dom";
import { School } from "../../types";

export const Table = ({
  data,
  deleteFn,
}: {
  data: School[] | undefined;
  deleteFn: (id: string) => void;
}) => {
  console.log(data);

  if (!data || data.length === 0) {
    return <div>No school data</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, key) => {
            return (
              <tr key={`row-${key}`}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>
                  <Link to={`/${row.id}`}>
                    <button className="btn btn-sm btn-neutral">Edit</button>
                  </Link>

                  <button
                    onClick={() => deleteFn(row.id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
