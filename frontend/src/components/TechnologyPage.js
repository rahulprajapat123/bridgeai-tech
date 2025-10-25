// TechnologyPage Component
function TechnologyPage() {
  const infrastructure = [
    { name: 'Azure', description: 'Full Azure AI Services integration', icon: '☁️' },
    { name: 'GCP', description: 'Google Cloud AI platform support', icon: '☁️' },
    { name: 'On-premises', description: 'Private cloud deployments', icon: '🏢' },
    { name: 'VDI', description: 'Virtual desktop infrastructure', icon: '💻' }
  ];

  const integrations = [
    { name: 'Microsoft 365', icon: '📧' },
    { name: 'Salesforce', icon: '⚡' },
    { name: 'SharePoint', icon: '📁' },
    { name: 'HubSpot', icon: '🎯' }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Technology & Integration</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Deploy on your preferred infrastructure with seamless integration to existing systems
          </p>
        </div>

        {/* Infrastructure Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Infrastructure</h2>
          <p className="text-slate-300 mb-8">
            We deploy on your preferred cloud platform or on-premises infrastructure with appropriate security controls.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {infrastructure.map((infra, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all text-center"
              >
                <div className="text-4xl mb-4">{infra.icon}</div>
                <h3 className="text-xl font-bold mb-2">{infra.name}</h3>
                <p className="text-sm text-slate-400">{infra.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Integrations</h2>
          <p className="text-slate-300 mb-8">
            Connect with your existing business systems and data sources through APIs and standard connectors.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all text-center"
              >
                <div className="text-4xl mb-3">{integration.icon}</div>
                <h3 className="font-semibold">{integration.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Technology Stack</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">AI Models</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• OpenAI GPT-4</li>
                <li>• Anthropic Claude</li>
                <li>• Google Gemini</li>
                <li>• Azure OpenAI</li>
                <li>• Custom fine-tuned models</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Frameworks</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• LangChain</li>
                <li>• LlamaIndex</li>
                <li>• Vector databases</li>
                <li>• RAG pipelines</li>
                <li>• Agent orchestration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">Infrastructure</h3>
              <ul className="space-y-2 text-slate-300">
                <li>• Kubernetes</li>
                <li>• Docker</li>
                <li>• Terraform</li>
                <li>• CI/CD pipelines</li>
                <li>• Monitoring & logging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyPage;