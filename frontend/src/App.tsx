import "./App.css";

import { useSchool, useSchools } from "./query";

import { useCreateSchool, useDeleteSchool, useUpdateSchool } from "./mutation";

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

  const { data, isLoading } = useSchool({ id });

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

// Edit page (Update)
function Edit() {
  let { id } = useParams();

  const updateSchool = useUpdateSchool();

  const { data, isLoading } = useSchool({ id });

  if (isLoading)
    return <span className="loading loading-infinity loading-xs"></span>;

  return (
    <BasicLayout>
      <h1 className="text-lg font-bold">Edit</h1>
      <Display
        id={data?.data?.school?.id ?? ""}
        name={data?.data?.school?.name ?? ""}
      />
      <Form
        mutateFn={(data) => updateSchool.mutate(data)}
        action={`Update`}
        defaultValue={data?.data?.school}
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
  const createSchool = useCreateSchool();
  const deleteSchhol = useDeleteSchool();

  return (
    <div>
      <BasicLayout>
        <Form
          mutateFn={(data) => createSchool.mutate(data)}
          error={createSchool?.error?.message ?? ""}
        />
        <Table
          data={data?.schools}
          deleteFn={(id) => deleteSchhol.mutate(id)}
        />
      </BasicLayout>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Schools />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
