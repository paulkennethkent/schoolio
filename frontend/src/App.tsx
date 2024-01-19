import "./App.css";

import { useSchool, useSchools } from "./query";

import { useCreateSchool, useDeleteSchool } from "./mutation";

import { Table } from "./components/Table";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { BasicLayout } from "./layout";
import { Form } from "./components/Form";
import { Display } from "./components/Display";

// View page (Read)
function View() {
  let { id } = useParams();

  const { data, isLoading } = useSchool({ id: id ?? null });

  if (isLoading)
    return <span className="loading loading-infinity loading-xs"></span>;

  return (
    <BasicLayout>
      <h1 className="text-lg font-bold">View</h1>
      <Display
        id={data?.data?.school?.id ?? ""}
        name={data?.data?.school?.name ?? ""}
      />
      <Link to={`/`}>
        <button className="btn btn-sm btn-neutral">Back</button>
      </Link>
    </BasicLayout>
  );
}

// Home page (List)
function Schools() {
  const { data } = useSchools();
  const { mutate, error } = useCreateSchool();
  const deleteSchhol = useDeleteSchool();

  return (
    <div>
      <BasicLayout>
        <div className="grid grid-flow-col gap-2 h-[500px]">
          <div>
            <Form
              mutateFn={(data) => mutate(data)}
              error={error?.message ?? ""}
            />
            <Table data={data?.schools} deleteFn={deleteSchhol.mutate} />
          </div>
          <div className="border border-b-2 shadow">
            <Display />
          </div>
        </div>
      </BasicLayout>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Schools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
