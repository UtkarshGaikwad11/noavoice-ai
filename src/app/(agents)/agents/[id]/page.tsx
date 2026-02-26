import AgentDetailPage from "@/components/agents/agent-detail-page";

// export default function Page({ params }: { params: { id: string } }) {
//   return <AgentDetailPage id={params.id} />;
// }

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AgentDetailPage id={id} />;
}