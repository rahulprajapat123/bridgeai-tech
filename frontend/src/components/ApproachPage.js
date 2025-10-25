// ApproachPage Component
function ApproachPage() {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Design',
      description: 'Understand your use cases, infrastructure requirements, and success criteria.',
      details: [
        'Stakeholder interviews and workshops',
        'Current state analysis',
        'Success metrics definition',
        'Technical requirements gathering'
      ]
    },
    {
      number: '02',
      title: 'Architecture',
      description: 'Design solutions that integrate with your existing systems and workflows.',
      details: [
        'System integration design',
        'Security and compliance planning',
        'Infrastructure selection',
        'Scalability and performance modeling'
      ]
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Build and deploy with clear milestones, testing, and stakeholder validation.',
      details: [
        'Agile development sprints',
        'Continuous testing and QA',
        'Stakeholder demos and feedback',
        'Production deployment'
      ]
    },
    {
      number: '04',
      title: 'Support & Optimization',
      description: 'Ongoing monitoring, refinement, and evolution based on performance data.',
      details: [
        'Performance monitoring',
        'User feedback collection',
        'Continuous improvement',
        'Feature enhancements'
      ]
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Our Approach</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We focus on practical implementation and measurable business outcomes, not technology for its own sake.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start space-x-6">
                <div className="text-6xl font-bold text-cyan-500/20">{step.number}</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3">{step.title}</h3>
                  <p className="text-xl text-slate-300 mb-6">{step.description}</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {step.details.map((detail, j) => (
                      <div key={j} className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-1">✓</span>
                        <span className="text-slate-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-8 border border-cyan-500/20">
          <h3 className="text-2xl font-bold mb-4 text-center">Why This Approach Works</h3>
          <p className="text-slate-300 text-center max-w-3xl mx-auto">
            By combining strategic thinking with practical implementation, we ensure your AI initiatives deliver real value. 
            Our iterative approach allows for continuous learning and adaptation, minimizing risk while maximizing impact.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApproachPage;