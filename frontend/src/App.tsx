import "./App.css";

import { useSchools } from "./query";

import { useCreateSchool, useDeleteSchool } from "./mutation";

import { Table } from "./components/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicLayout } from "./layout";
import { Form } from "./components/Form";
import { Display } from "./components/Display";

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
