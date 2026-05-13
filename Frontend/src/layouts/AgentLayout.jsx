import { Outlet } from 'react-router-dom';

const AgentLayout = () => {
  return (
    <div className="agent-container">
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default AgentLayout;
