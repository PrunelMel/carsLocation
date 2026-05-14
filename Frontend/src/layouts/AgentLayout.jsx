import { Outlet } from 'react-router-dom';

const AgentLayout = () => {
  return (
    <div className="agent-container min-h-screen">
      <main className="mx-auto max-w-screen-2xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AgentLayout;
