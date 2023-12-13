export const Display = ({ id, name }: { id: string; name: string }) => {
  return (
    <div className="stat">
      <div className="stat-title">id: {id}</div>
      <div className="stat-value">name: {name}</div>
    </div>
  );
};
