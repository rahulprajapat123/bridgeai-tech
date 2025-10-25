// SecurityPage Component
function SecurityPage() {
  const securityFeatures = [
    {
      title: 'Data Protection',
      icon: '🔒',
      features: [
        'Tenant isolation',
        'Role-based access controls',
        'Data residency compliance',
        'End-to-end encryption'
      ]
    },
    {
      title: 'Governance',
      icon: '⚖️',
      features: [
        'Audit logging',
        'Content controls',
        'Cost monitoring',
        'Approval workflows for production deployments'
      ]
    },
    {
      title: 'Privacy & Risk',
      icon: '🛡️',
      features: [
        'PII handling protocols',
        'Data retention policies',
        'Incident response procedures',
        'Regular security assessments'
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Security & Compliance</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Enterprise-grade security controls to meet your organization's requirements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, i) => (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.features.map((item, j) => (
                  <li key={j} className="flex items-start space-x-2">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance Standards */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-8 border border-cyan-500/20">
          <h2 className="text-3xl font-bold mb-6 text-center">Compliance Standards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['SOC 2 Type II', 'GDPR', 'HIPAA', 'ISO 27001'].map((standard, i) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">✓</div>
                <div className="font-semibold">{standard}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-center mt-8">
            Our solutions are designed to meet the highest industry standards for security and compliance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;