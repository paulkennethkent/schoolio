import { useSchools } from "../../query";
import useSelectedSchool, {
  useChangeSchool,
  useOptimismStore,
} from "../../store";

export const Navbar = () => {
  const schools = useSchools();

  const changeSchool = useChangeSchool();

  const { optimism, setOptimism } = useOptimismStore();

  return (
    <div className="navbar bg-base-100 drop-shadow-md">
      <a className="btn btn-ghost text-xl">Schoolio</a>

      <select
        className="select w-full max-w-xs"
        onChange={(e) => {
          console.log(e.target.value);
          changeSchool(e.target.value);
        }}
      >
        <option disabled selected>
          Pick your school
        </option>
        {schools.data?.schools.map((sch) => (
          <option value={sch.id}>{sch.name}</option>
        ))}
      </select>
      <label htmlFor="opt">Use Optimism</label>
      <input
        id="opt"
        type="checkbox"
        checked={optimism}
        onChange={(e) => {
          setOptimism(!optimism);
        }}
      />
    </div>
  );
};
