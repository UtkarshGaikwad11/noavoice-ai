import AgentDetailPage from "@/components/agents/agent-detail-page";

export default function Page({ params }: { params: { id: string } }) {
  return <AgentDetailPage id={params.id} />;
}