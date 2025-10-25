// UseCasesPage Component
function UseCasesPage() {
  const useCases = [
    {
      title: 'Sales Enablement',
      icon: '📊',
      features: [
        'Account intelligence and research automation',
        'Proposal and document generation',
        'Lead qualification and routing',
        'CRM data enrichment'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Marketing Operations',
      icon: '🎯',
      features: [
        'Content creation and optimization',
        'Campaign automation and personalization',
        'Market intelligence and trend analysis',
        'Multi-channel content distribution'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Business Intelligence',
      icon: '📈',
      features: [
        'Document analysis and summarization',
        'Custom reporting and dashboards',
        'Voice-of-customer analysis',
        'Competitive intelligence'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Customer Experience',
      icon: '💬',
      features: [
        'Interactive AI assistants and avatars',
        'Multi-lingual support automation',
        'Event and presentation support',
        'Customer journey optimization'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Use Cases</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Practical AI applications that drive measurable business outcomes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, i) => (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl"
            >
              <div className={`inline-block p-4 rounded-lg bg-gradient-to-br ${useCase.color} mb-6`}>
                <span className="text-4xl">{useCase.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
              <ul className="space-y-3">
                {useCase.features.map((feature, j) => (
                  <li key={j} className="flex items-start space-x-3">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UseCasesPage;